package com.example.demo.repository;

import com.example.demo.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    // JpaRepository đã có sẵn các hàm: findAll, findById, save, delete...
    // Không cần viết gì thêm cũng chạy ngon!
}