package com.example.demo.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String material; // Chất liệu

    private Double price; // Giá (nếu cần)

    // Quan hệ: Nhiều sản phẩm thuộc 1 Danh mục
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false) 
    private Category category;

    // cascade = CascadeType.ALL nghĩa là: Xóa sản phẩm thì xóa luôn ảnh của nó
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<ProductImage> images;


}