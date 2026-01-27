package com.example.demo.config; // Sửa package theo máy bạn

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {
    // Đây là "bí mật quân sự", không được lộ. Tạm thời để cứng ở đây.
    private static final String SECRET_KEY = "day-la-khoa-bi-mat-cuc-manh-khong-ai-doan-duoc-dau-nha"; 

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    // Hàm tạo Token từ username
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date()) // Ngày tạo: Bây giờ
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // Hết hạn sau 1 ngày (86400000 ms)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }
}