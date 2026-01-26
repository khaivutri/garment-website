package com.example.demo.controller;

import com.example.demo.config.JwtUtils;
import com.example.demo.entity.Admin;
import com.example.demo.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AdminRepository adminRepo;

    @Autowired
    private JwtUtils jwtUtils;

    // Tự tạo PasswordEncoder vì chưa cấu hình Bean
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/login")
    public String login(@RequestBody Admin loginRequest) {
        // 1. Tìm user trong DB
        Optional<Admin> adminOptional = adminRepo.findByUsername(loginRequest.getUsername());

        // 2. Nếu có user + Mật khẩu khớp
        if (adminOptional.isPresent()) {
            Admin admin = adminOptional.get();
            if (passwordEncoder.matches(loginRequest.getPassword(), admin.getPassword())) {
                // 3. Tạo Token trả về
                return jwtUtils.generateToken(admin.getUsername());
            }
        }
        
        // 4. Đăng nhập sai
        throw new RuntimeException("Sai tài khoản hoặc mật khẩu!");
    }
}