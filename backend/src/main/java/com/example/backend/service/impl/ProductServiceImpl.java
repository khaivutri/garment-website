package com.example.backend.service.impl;

import com.example.backend.dto.ProductDTO;
import com.example.backend.model.Product;
import com.example.backend.model.Category;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.service.ProductService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public ProductDTO createProduct(ProductDTO dto) {
        Product product = new Product();
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setMaterial(dto.getMaterial());
        product.setPrice(dto.getPrice());

        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Category not found with ID: " + dto.getCategoryId()));
        product.setCategory(category);

        Product savedProduct = productRepository.save(product);
        dto.setId(savedProduct.getId());
        return dto;
    }

    @Override
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream().map(product -> {
            ProductDTO dto = new ProductDTO();
            dto.setId(product.getId());
            dto.setName(product.getName());
            dto.setDescription(product.getDescription());
            dto.setMaterial(product.getMaterial());
            dto.setPrice(product.getPrice());
            dto.setCategoryId(product.getCategory().getId());
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Product not found with ID: " + id));

        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setMaterial(product.getMaterial());
        dto.setPrice(product.getPrice());
        dto.setCategoryId(product.getCategory().getId());

        if (product.getImages() != null) {
            dto.setImageUrls(product.getImages().stream()
                    .map(img -> img.getImageUrl())
                    .collect(Collectors.toList()));
        }
        return dto;
    }

    @Override
    @Transactional
    public ProductDTO updateProduct(Long id, ProductDTO dto) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Product not found with ID: " + id));

        existingProduct.setName(dto.getName());
        existingProduct.setDescription(dto.getDescription());
        existingProduct.setMaterial(dto.getMaterial());
        existingProduct.setPrice(dto.getPrice());

        if (!existingProduct.getCategory().getId().equals(dto.getCategoryId())) {
            Category newCategory = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND, "Category not found with ID: " + dto.getCategoryId()));
            existingProduct.setCategory(newCategory);
        }

        Product savedProduct = productRepository.save(existingProduct);
        dto.setId(savedProduct.getId());
        return dto;
    }

    @Override
    @Transactional
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Product not found with ID: " + id);
        }

        productRepository.deleteById(id);
    }
}