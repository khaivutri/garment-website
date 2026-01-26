package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity; // Import cái này để tránh lỗi vòng lặp
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "product_images")
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String imageUrl; // Link ảnh (ví dụ: https://cloudinary...)

    private boolean isThumbnail; // Đánh dấu ảnh này là ảnh đại diện hay không

    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnore // Quan trọng: Khi trả về JSON, đừng lôi ngược lại Product nữa kẻo bị lặp vô tận
    private Product product;
}