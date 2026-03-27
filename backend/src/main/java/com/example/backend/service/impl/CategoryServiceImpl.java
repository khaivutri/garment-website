package com.example.backend.service.impl;

import com.example.backend.dto.CategoryDTO;
import com.example.backend.dto.CategoryResponseDTO;
import com.example.backend.model.Category;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<CategoryResponseDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CategoryResponseDTO getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Category not found with ID: " + id));
        return toDTO(category);
    }

    @Override
    public CategoryResponseDTO createCategory(CategoryDTO dto) {
        Category category = new Category();
        category.setName(dto.getName());
        category.setDescription(dto.getDescription());
        return toDTO(categoryRepository.save(category));
    }

    @Override
    public CategoryResponseDTO updateCategory(Long id, CategoryDTO dto) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Category not found with ID: " + id));
        category.setName(dto.getName());
        category.setDescription(dto.getDescription());
        return toDTO(categoryRepository.save(category));
    }

    @Override
    public void deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Category not found with ID: " + id);
        }
        // Check if category has products
        long productCount = productRepository.countByCategoryId(id);
        if (productCount > 0) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Cannot delete category: it still has " + productCount
                            + " product(s). Please reassign or delete them first.");
        }
        categoryRepository.deleteById(id);
    }

    private CategoryResponseDTO toDTO(Category c) {
        return CategoryResponseDTO.builder()
                .id(c.getId())
                .name(c.getName())
                .description(c.getDescription())
                .build();
    }
}
