package com.example.backend.service.impl;

import com.example.backend.dto.ProductDTO;
import com.example.backend.dto.ProductResponseDTO;
import com.example.backend.model.Category;
import com.example.backend.model.Product;
import com.example.backend.model.ProductImage;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.ProductImageRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.service.ProductService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductImageRepository productImageRepository;

    @Override
    @Transactional
    public ProductResponseDTO createProduct(ProductDTO dto) {
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

        // Save image URLs
        if (dto.getImageUrls() != null && !dto.getImageUrls().isEmpty()) {
            boolean isFirst = true;
            for (String url : dto.getImageUrls()) {
                ProductImage img = new ProductImage();
                img.setImageUrl(url);
                img.setThumbnail(isFirst);
                img.setProduct(savedProduct);
                productImageRepository.save(img);
                isFirst = false;
            }
        }

        return convertToResponseDTO(productRepository.findById(savedProduct.getId()).orElse(savedProduct));
    }

    @Override
    public List<ProductResponseDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ProductResponseDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Product not found with ID: " + id));
        return convertToResponseDTO(product);
    }

    @Override
    @Transactional
    public ProductResponseDTO updateProduct(Long id, ProductDTO dto) {
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

        // Replace image URLs
        productImageRepository.deleteByProductId(id);
        if (dto.getImageUrls() != null && !dto.getImageUrls().isEmpty()) {
            boolean isFirst = true;
            for (String url : dto.getImageUrls()) {
                ProductImage img = new ProductImage();
                img.setImageUrl(url);
                img.setThumbnail(isFirst);
                img.setProduct(existingProduct);
                productImageRepository.save(img);
                isFirst = false;
            }
        }

        productRepository.save(existingProduct);
        return convertToResponseDTO(productRepository.findById(id).orElse(existingProduct));
    }

    @Override
    @Transactional
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Product not found with ID: " + id);
        }
        productImageRepository.deleteByProductId(id);
        productRepository.deleteById(id);
    }

    private ProductResponseDTO convertToResponseDTO(Product product) {
        List<String> imageUrls = (product.getImages() != null)
                ? product.getImages().stream()
                        .map(ProductImage::getImageUrl)
                        .collect(Collectors.toList())
                : Collections.emptyList();

        return ProductResponseDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .material(product.getMaterial())
                .price(product.getPrice())
                .categoryId(product.getCategory().getId())
                .categoryName(product.getCategory().getName())
                .imageUrls(imageUrls)
                .build();
    }
}