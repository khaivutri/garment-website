package com.example.demo.repository;

import com.example.demo.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    // Tìm sản phẩm theo ID danh mục
    // Spring Boot tự động dịch tên hàm này thành câu SQL: SELECT * FROM products WHERE category_id = ?
    List<Product> findByCategoryId(Long categoryId);
}