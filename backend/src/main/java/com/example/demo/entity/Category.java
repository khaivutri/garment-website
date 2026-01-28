package com.example.demo.entity; 

import jakarta.persistence.Column;
import jakarta.persistence.Entity; 
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data 
@Table(name = "categories") // Đặt tên bảng trong DB là số nhiều
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Tự động tăng ID (Auto Increment)
    private Long id;

    @Column(nullable = false) // Không được để trống
    private String name;

    @Column(columnDefinition = "TEXT") // Cho phép nhập văn bản dài
    private String description;
}