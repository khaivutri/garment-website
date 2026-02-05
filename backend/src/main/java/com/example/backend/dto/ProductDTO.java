package com.example.backend.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private String material;
    private BigDecimal price;
    private Long categoryId;
    private List<String> imageUrls;
}