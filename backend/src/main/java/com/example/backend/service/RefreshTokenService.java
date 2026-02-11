package com.example.backend.service;

import com.example.backend.model.RefreshToken;
import com.example.backend.repository.RefreshTokenRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService {

    private static final Logger logger = LoggerFactory.getLogger(RefreshTokenService.class);

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Value("${app.jwt.refresh-expiration:604800000}")
    private long refreshTokenExpiration;

    @Transactional
    public RefreshToken createRefreshToken(String username) {
        // Revoke tất cả refresh token cũ của user
        refreshTokenRepository.revokeAllByUsername(username);

        RefreshToken refreshToken = RefreshToken.builder()
                .username(username)
                .token(UUID.randomUUID().toString())
                .expiryDate(Instant.now().plusMillis(refreshTokenExpiration))
                .revoked(false)
                .build();

        return refreshTokenRepository.save(refreshToken);
    }

    /**
     * Tìm refresh token theo token string
     */
    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    /**
     * Validate refresh token
     * 
     * @return true nếu token hợp lệ, false nếu không hợp lệ hoặc hết hạn
     */
    public boolean validateRefreshToken(RefreshToken token) {
        if (token == null) {
            return false;
        }

        if (token.isExpired() || token.isRevoked()) {
            logger.debug("Refresh token validation failed");
            return false;
        }

        return true;
    }

    /**
     * Revoke refresh token
     */
    @Transactional
    public void revokeToken(RefreshToken token) {
        token.setRevoked(true);
        refreshTokenRepository.save(token);
        logger.debug("Refresh token revoked");
    }

    /**
     * Revoke tất cả refresh token của user (khi logout hoặc đổi mật khẩu)
     */
    @Transactional
    public void revokeAllTokensByUsername(String username) {
        refreshTokenRepository.revokeAllByUsername(username);
        // Don't log username to prevent information leakage
        logger.debug("All refresh tokens revoked for a user");
    }

    /**
     * Scheduled task để xóa các token hết hạn (chạy hàng ngày lúc 2 giờ sáng)
     */
    @Scheduled(cron = "0 0 2 * * ?")
    @Transactional
    public void cleanupExpiredTokens() {
        refreshTokenRepository.deleteExpiredTokens(Instant.now());
        logger.info("Cleaned up expired refresh tokens");
    }

    public long getRefreshTokenExpiration() {
        return refreshTokenExpiration;
    }
}
