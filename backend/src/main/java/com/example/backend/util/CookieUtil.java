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
    public static final String ACCESS_TOKEN_COOKIE_NAME = "accessToken";

    // ============================================================
    // REFRESH TOKEN COOKIE (HTTP-only, path /api/auth)
    // ============================================================

    public void createRefreshTokenCookie(HttpServletResponse response, String refreshToken, long maxAgeSeconds) {
        String cookieHeader = String.format("%s=%s; Max-Age=%d; Path=%s; HttpOnly%s; SameSite=%s",
                REFRESH_TOKEN_COOKIE_NAME,
                refreshToken,
                maxAgeSeconds,
                "/api/auth",
                secureCookie ? "; Secure" : "",
                sameSite);
        response.addHeader("Set-Cookie", cookieHeader);
    }

    public void deleteRefreshTokenCookie(HttpServletResponse response) {
        String cookieHeader = String.format("%s=; Max-Age=0; Path=%s; HttpOnly%s; SameSite=%s",
                REFRESH_TOKEN_COOKIE_NAME,
                "/api/auth",
                secureCookie ? "; Secure" : "",
                sameSite);
        response.addHeader("Set-Cookie", cookieHeader);
    }

    public String getRefreshTokenFromCookie(HttpServletRequest request) {
        return getCookieValue(request, REFRESH_TOKEN_COOKIE_NAME);
    }

    // ============================================================
    // ACCESS TOKEN COOKIE (HTTP-only, path /)
    // ============================================================

    /**
     * Tạo HTTP-only cookie cho access token.
     * Path=/ để tự động gửi kèm mọi API request.
     */
    public void createAccessTokenCookie(HttpServletResponse response, String accessToken, long maxAgeSeconds) {
        String cookieHeader = String.format("%s=%s; Max-Age=%d; Path=%s; HttpOnly%s; SameSite=%s",
                ACCESS_TOKEN_COOKIE_NAME,
                accessToken,
                maxAgeSeconds,
                "/",
                secureCookie ? "; Secure" : "",
                sameSite);
        response.addHeader("Set-Cookie", cookieHeader);
    }

    public void deleteAccessTokenCookie(HttpServletResponse response) {
        String cookieHeader = String.format("%s=; Max-Age=0; Path=%s; HttpOnly%s; SameSite=%s",
                ACCESS_TOKEN_COOKIE_NAME,
                "/",
                secureCookie ? "; Secure" : "",
                sameSite);
        response.addHeader("Set-Cookie", cookieHeader);
    }

    public String getAccessTokenFromCookie(HttpServletRequest request) {
        return getCookieValue(request, ACCESS_TOKEN_COOKIE_NAME);
    }

    // ============================================================
    // Helper
    // ============================================================

    private String getCookieValue(HttpServletRequest request, String name) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (name.equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}
