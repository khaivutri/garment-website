package com.example.backend.controller;

import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.AuthResponse;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenProvider tokenProvider;

    @Autowired
    UserRepository userRepository;

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()));

            String jwt = tokenProvider.generateToken(authentication.getName());
            return ResponseEntity.ok(new AuthResponse(jwt, "Bearer"));

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid username or password");
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Authentication failed: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

//    // Endpoint để tạo user mới (CHỈ DÙNG CHO DEVELOPMENT HELPER để test, sửa sau ở spring tiếp theo!!)
//    @PostMapping("/register")
//    public ResponseEntity<?> registerUser(@RequestBody LoginRequest request) {
//        try {
//            if (userRepository.findByUsername(request.getUsername()).isPresent()) {
//                return ResponseEntity.badRequest().body("User already exists!");
//            }
//
//            User user = new User();
//            user.setUsername(request.getUsername());
//            user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
//            user.setRole("ADMIN");
//
//            userRepository.save(user);
//            return ResponseEntity.ok("User created successfully!");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("Error: " + e.getMessage());
//        }
//    }

    @GetMapping("/test")
    public String test() {
        return "Auth API is working!";
    }
}