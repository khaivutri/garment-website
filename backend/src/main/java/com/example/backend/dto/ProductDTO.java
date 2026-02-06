package com.example.backend.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Data
public class ProductDTO {
    private Long id;
    @NotBlank
    private String name;
    private String description;
    private String material;
    @NotNull
    @Positive
    private BigDecimal price;
    @NotNull
    private Long categoryId;
    private List<String> imageUrls;
}