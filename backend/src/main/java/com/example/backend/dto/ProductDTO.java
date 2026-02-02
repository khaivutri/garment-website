package com.example.backend.dto;

import lombok.Data;
import java.util.List;

@Data
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private String material;
    private Long categoryId; // Chỉ gửi ID danh mục để tối ưu dữ liệu
    private List<String> imageUrls; // Danh sách các URL ảnh sau khi upload
}