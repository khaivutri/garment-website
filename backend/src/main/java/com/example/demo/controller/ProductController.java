package com.example.demo.controller;

import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductRepository productRepo;

    // 1. Lấy tất cả sản phẩm
    // GET http://localhost:8080/api/products
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    // 2. Lấy chi tiết 1 sản phẩm theo ID
    // GET http://localhost:8080/api/products/1
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        Optional<Product> product = productRepo.findById(id);
        return product.orElse(null); // Nếu không thấy thì trả về null
    }

    // 3. Lấy sản phẩm theo Danh mục (VD: Lấy toàn bộ Áo khoác)
    // GET http://localhost:8080/api/products/category/1
    @GetMapping("/category/{categoryId}")
    public List<Product> getProductsByCategory(@PathVariable Long categoryId) {
        return productRepo.findByCategoryId(categoryId);
    }

    // 4. Thêm sản phẩm (Admin dùng)
    // POST http://localhost:8080/api/products
    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productRepo.save(product);
    }
}