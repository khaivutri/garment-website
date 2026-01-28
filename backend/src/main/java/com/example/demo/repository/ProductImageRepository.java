package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.ProductImage;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
    // Thường thì ta lấy ảnh thông qua Product rồi, nên ở đây để trống cũng được ( chắc vậy @@)
}