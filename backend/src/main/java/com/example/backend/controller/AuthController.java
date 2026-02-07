package com.example.backend.controller;

import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.AuthResponse;
import com.example.backend.model.RefreshToken;
import com.example.backend.security.JwtTokenProvider;
import com.example.backend.service.RefreshTokenService;
import com.example.backend.util.CookieUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

    /**
     * Login endpoint
     * - Trả về access token trong response body
     * - Đặt refresh token trong HTTP-only cookie
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

            // Tạo access token
            String accessToken = tokenProvider.generateToken(username);

            // Tạo refresh token và lưu vào database
            RefreshToken refreshToken = refreshTokenService.createRefreshToken(username);

            // Đặt refresh token vào HTTP-only cookie
            long maxAgeSeconds = refreshTokenService.getRefreshTokenExpiration() / 1000;
            cookieUtil.createRefreshTokenCookie(response, refreshToken.getToken(), maxAgeSeconds);

            logger.debug("User logged in successfully");
            return ResponseEntity.ok(new AuthResponse(accessToken, "Bearer"));

        } catch (Exception e) {

            logger.debug("Authentication failed");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Authentication failed. Please check your credentials."));
        }
    }

    /**
     * Refresh endpoint
     * - Đọc refresh token từ HTTP-only cookie
     * - Validate và tạo access token mới
     * - Tùy chọn: rotate refresh token (tạo mới refresh token)
     */
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(
            HttpServletRequest request,
            HttpServletResponse response) {
        try {
            // Lấy refresh token từ cookie
            String refreshTokenStr = cookieUtil.getRefreshTokenFromCookie(request);

            if (refreshTokenStr == null) {
                logger.debug("Refresh token not found in cookie");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Refresh token not found"));
            }

            // Tìm và validate refresh token
            Optional<RefreshToken> refreshTokenOpt = refreshTokenService.findByToken(refreshTokenStr);

            if (refreshTokenOpt.isEmpty()) {
                logger.debug("Refresh token validation failed");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Invalid refresh token"));
            }

            RefreshToken refreshToken = refreshTokenOpt.get();

            if (!refreshTokenService.validateRefreshToken(refreshToken)) {
                // Token không hợp lệ hoặc hết hạn, xóa cookie
                cookieUtil.deleteRefreshTokenCookie(response);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Refresh token expired or revoked"));
            }

            // Tạo access token mới
            String username = refreshToken.getUsername();
            String newAccessToken = tokenProvider.generateToken(username);

            // Token Rotation: Tạo refresh token mới để tăng cường bảo mật
            RefreshToken newRefreshToken = refreshTokenService.createRefreshToken(username);
            long maxAgeSeconds = refreshTokenService.getRefreshTokenExpiration() / 1000;
            cookieUtil.createRefreshTokenCookie(response, newRefreshToken.getToken(), maxAgeSeconds);

            logger.debug("Access token refreshed successfully");
            return ResponseEntity.ok(new AuthResponse(newAccessToken, "Bearer"));

        } catch (Exception e) {
            logger.error("Error refreshing token", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error refreshing token"));
        }
    }

    /**
     * Logout endpoint
     * - Revoke refresh token trong database
     * - Xóa refresh token cookie
     */
    @PostMapping("/logout")
    public ResponseEntity<?> logout(
            HttpServletRequest request,
            HttpServletResponse response) {
        try {
            // Lấy refresh token từ cookie
            String refreshTokenStr = cookieUtil.getRefreshTokenFromCookie(request);

            if (refreshTokenStr != null) {
                // Tìm và revoke refresh token
                Optional<RefreshToken> refreshTokenOpt = refreshTokenService.findByToken(refreshTokenStr);
                refreshTokenOpt.ifPresent(refreshTokenService::revokeToken);
            }

            // Xóa cookie
            cookieUtil.deleteRefreshTokenCookie(response);

            // Clear security context
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