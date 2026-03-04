package com.example.backend.controller;

import com.example.backend.dto.LoginRequest;
import com.example.backend.model.RefreshToken;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.JwtTokenProvider;
import com.example.backend.service.RefreshTokenService;
import com.example.backend.util.CookieUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private RefreshTokenService refreshTokenService;

    @Autowired
    private CookieUtil cookieUtil;

    @Autowired
    private UserRepository userRepository;

    @Value("${app.jwt.expiration:900000}")
    private long jwtExpiration;

    /**
     * Login endpoint
     * - Đặt access token VÀ refresh token vào HTTP-only cookies
     * - Không trả về token trong body (bảo mật hơn)
     */
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(
            @RequestBody LoginRequest loginRequest,
            HttpServletResponse response) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()));

            String username = authentication.getName();

            // Tạo access token → lưu vào HTTP-only cookie
            String accessToken = tokenProvider.generateToken(username);
            long accessMaxAge = jwtExpiration / 1000;
            cookieUtil.createAccessTokenCookie(response, accessToken, accessMaxAge);

            // Tạo refresh token → lưu vào HTTP-only cookie
            RefreshToken refreshToken = refreshTokenService.createRefreshToken(username);
            long refreshMaxAge = refreshTokenService.getRefreshTokenExpiration() / 1000;
            cookieUtil.createRefreshTokenCookie(response, refreshToken.getToken(), refreshMaxAge);

            // Lấy role từ DB để trả về cho frontend
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            logger.debug("User logged in successfully");
            return ResponseEntity.ok(Map.of(
                    "username", username,
                    "role", user.getRole()));

        } catch (Exception e) {
            logger.debug("Authentication failed");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Authentication failed. Please check your credentials."));
        }
    }

    /**
     * Me endpoint – trả về thông tin user hiện tại (đọc từ SecurityContext).
     * Frontend gọi sau khi load trang để khôi phục session.
     */
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Not authenticated"));
        }
        String username = userDetails.getUsername();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(Map.of(
                "username", username,
                "role", user.getRole()));
    }

    /**
     * Refresh endpoint
     * - Đọc refresh token từ HTTP-only cookie
     * - Tạo access token mới → set vào cookie
     */
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(
            HttpServletRequest request,
            HttpServletResponse response) {
        try {
            String refreshTokenStr = cookieUtil.getRefreshTokenFromCookie(request);

            if (refreshTokenStr == null) {
                logger.debug("Refresh token not found in cookie");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Refresh token not found"));
            }

            Optional<RefreshToken> refreshTokenOpt = refreshTokenService.findByToken(refreshTokenStr);

            if (refreshTokenOpt.isEmpty()) {
                logger.debug("Refresh token validation failed");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Invalid refresh token"));
            }

            RefreshToken refreshToken = refreshTokenOpt.get();

            if (!refreshTokenService.validateRefreshToken(refreshToken)) {
                cookieUtil.deleteRefreshTokenCookie(response);
                cookieUtil.deleteAccessTokenCookie(response);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Refresh token expired or revoked"));
            }

            String username = refreshToken.getUsername();

            // Tạo access token mới → cookie
            String newAccessToken = tokenProvider.generateToken(username);
            long accessMaxAge = jwtExpiration / 1000;
            cookieUtil.createAccessTokenCookie(response, newAccessToken, accessMaxAge);

            // Token rotation: refresh token mới
            RefreshToken newRefreshToken = refreshTokenService.createRefreshToken(username);
            long refreshMaxAge = refreshTokenService.getRefreshTokenExpiration() / 1000;
            cookieUtil.createRefreshTokenCookie(response, newRefreshToken.getToken(), refreshMaxAge);

            logger.debug("Access token refreshed successfully");
            return ResponseEntity.ok(Map.of("message", "Token refreshed"));

        } catch (Exception e) {
            logger.error("Error refreshing token", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error refreshing token"));
        }
    }

    /**
     * Logout endpoint – xóa cả hai cookie
     */
    @PostMapping("/logout")
    public ResponseEntity<?> logout(
            HttpServletRequest request,
            HttpServletResponse response) {
        try {
            String refreshTokenStr = cookieUtil.getRefreshTokenFromCookie(request);
            if (refreshTokenStr != null) {
                Optional<RefreshToken> refreshTokenOpt = refreshTokenService.findByToken(refreshTokenStr);
                refreshTokenOpt.ifPresent(refreshTokenService::revokeToken);
            }

            cookieUtil.deleteRefreshTokenCookie(response);
            cookieUtil.deleteAccessTokenCookie(response);
            SecurityContextHolder.clearContext();

            logger.info("User logged out successfully");
            return ResponseEntity.ok(Map.of("message", "Logged out successfully"));

        } catch (Exception e) {
            logger.error("Error during logout", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error during logout"));
        }
    }
}