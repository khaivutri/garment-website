package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.http.HttpMethod; 

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                // 1. Cho phép đăng nhập
                .requestMatchers("/api/auth/login").permitAll()
                
                // 2. Cho phép xem sản phẩm, xem danh mục (GET)
                .requestMatchers(HttpMethod.GET, "/api/products/**", "/api/categories/**").permitAll()
                
                // 3. CÁC API KHÁC (Thêm, Sửa, Xóa) -> BẮT BUỘC ĐĂNG NHẬP
                .anyRequest().authenticated()
            );
            
        return http.build();
    }
}