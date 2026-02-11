package com.example.backend.util;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class CookieUtil {

    @Value("${app.cookie.secure:true}")
    private boolean secureCookie;

    @Value("${app.cookie.same-site:Strict}")
    private String sameSite;

    public static final String REFRESH_TOKEN_COOKIE_NAME = "refreshToken";

    /**
     * Tạo HTTP-only cookie cho refresh token
     * Cookie được cấu hình với các thuộc tính bảo mật:
     * - HttpOnly: Ngăn JavaScript truy cập cookie (chống XSS)
     * - Secure: Chỉ gửi qua HTTPS (trong production)
     * - SameSite: Ngăn CSRF attack
     * - Path: Giới hạn cookie chỉ gửi đến /api/auth
     */
    public void createRefreshTokenCookie(HttpServletResponse response, String refreshToken, long maxAgeSeconds) {
        Cookie cookie = new Cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(secureCookie);
        cookie.setPath("/api/auth"); 
        cookie.setMaxAge((int) maxAgeSeconds);

        String cookieHeader = String.format("%s=%s; Max-Age=%d; Path=%s; HttpOnly%s; SameSite=%s",
                REFRESH_TOKEN_COOKIE_NAME,
                refreshToken,
                maxAgeSeconds,
                "/api/auth",
                secureCookie ? "; Secure" : "",
                sameSite);

        response.addHeader("Set-Cookie", cookieHeader);
    }

    /**
     * Xóa refresh token cookie (khi logout)
     */
    public void deleteRefreshTokenCookie(HttpServletResponse response) {
        String cookieHeader = String.format("%s=; Max-Age=0; Path=%s; HttpOnly%s; SameSite=%s",
                REFRESH_TOKEN_COOKIE_NAME,
                "/api/auth",
                secureCookie ? "; Secure" : "",
                sameSite);

        response.addHeader("Set-Cookie", cookieHeader);
    }

    /**
     * Lấy refresh token từ cookie trong request
     */
    public String getRefreshTokenFromCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (REFRESH_TOKEN_COOKIE_NAME.equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}
