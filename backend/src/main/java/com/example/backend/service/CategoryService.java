package com.example.backend.service;

import com.example.backend.dto.CategoryDTO;
import com.example.backend.dto.CategoryResponseDTO;

import java.util.List;

public interface CategoryService {
    List<CategoryResponseDTO> getAllCategories();

    CategoryResponseDTO getCategoryById(Long id);

    CategoryResponseDTO createCategory(CategoryDTO dto);

    CategoryResponseDTO updateCategory(Long id, CategoryDTO dto);

    void deleteCategory(Long id);
}
