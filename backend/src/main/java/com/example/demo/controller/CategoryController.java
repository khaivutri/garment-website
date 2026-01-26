package com.example.demo.controller; 

import com.example.demo.entity.Category;
import com.example.demo.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "*") // Cho phép Frontend (Vercel/Localhost) gọi thoải mái
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepo;

    // API: Lấy tất cả danh mục
    // GET http://localhost:8080/api/categories
    @GetMapping
    public List<Category> getAllCategories() {
        return categoryRepo.findAll();
    }

    // API: Thêm danh mục mới (Dùng để test)
    // POST http://localhost:8080/api/categories
    @PostMapping
    public Category createCategory(@RequestBody Category category) {
        return categoryRepo.save(category);
    }
}