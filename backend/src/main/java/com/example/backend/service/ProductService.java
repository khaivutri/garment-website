package com.example.backend.service;

import com.example.backend.dto.ProductDTO;
import com.example.backend.dto.ProductResponseDTO;
import java.util.List;

public interface ProductService {
    List<ProductResponseDTO> getAllProducts();

    ProductResponseDTO getProductById(Long id);

    ProductResponseDTO createProduct(ProductDTO productDTO);

    ProductResponseDTO updateProduct(Long id, ProductDTO productDTO);

    void deleteProduct(Long id);
}