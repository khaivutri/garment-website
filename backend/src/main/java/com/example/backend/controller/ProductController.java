package com.example.backend.controller;

import com.example.backend.dto.ProductDTO;
import com.example.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductController {

    @Autowired
    private ProductService productService;

    // --- PUBLIC ENDPOINTS (Cho khách hàng xem sản phẩm) ---

    @GetMapping("/products")
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        // Trả về danh sách kèm mã 200 OK
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        // Lấy chi tiết 1 sản phẩm
        return ResponseEntity.ok(productService.getProductById(id));
    }

    // --- ADMIN ENDPOINTS (Yêu cầu quyền Admin trong Sprint tiếp theo sẽ thực hiện sau) ---

    @PostMapping("/admin/products")
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO productDTO) {
        // Tạo mới sản phẩm và trả về mã 201 Created
        ProductDTO createdProduct = productService.createProduct(productDTO);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }

    @PutMapping("/admin/products/{id}")
    public ResponseEntity<ProductDTO> updateProduct(
            @PathVariable Long id,
            @RequestBody ProductDTO productDTO) {
        // Sửa thông tin sản phẩm
        return ResponseEntity.ok(productService.updateProduct(id, productDTO));
    }

    @DeleteMapping("/admin/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        // Xóa sản phẩm và trả về mã 204 No Content (thành công nhưng không có nội dung trả về)
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}