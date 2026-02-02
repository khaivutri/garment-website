package com.example.backend.service.impl;

import com.example.backend.dto.ProductDTO;
import com.example.backend.model.Product;
import com.example.backend.model.Category;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.service.ProductService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
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

        // Tìm Category từ database và gán vào sản phẩm
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
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
            dto.setCategoryId(product.getCategory().getId());
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public ProductDTO getProductById(Long id) {
        // BƯỚC 1: Tìm kiếm sản phẩm trong DB bằng ID
        Product product = productRepository.findById(id).
                orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));

        // BƯỚC 2: Chuyển đổi (Mapping) từ Entity sang DTO để trả về cho Client
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setMaterial(product.getMaterial());
        dto.setCategoryId(product.getCategory().getId());
        // Lấy danh sách URL ảnh từ danh sách ProductImage (nếu có)
        if ( product.getImages() != null){
            dto.setImageUrls(product.getImages().stream()
                    .map(img -> img.getImageUrl())
                    .collect(Collectors.toList())
                    );
        }
        return dto;

    }

    @Override
    @Transactional // Đảm bảo tính toàn vẹn dữ liệu khi cập nhật nhiều bảng
    public ProductDTO updateProduct(Long id, ProductDTO dto) {
        // BƯỚC 1: Kiểm tra sản phẩm có tồn tại hay không trước khi sửa
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found, can't be update"));

        // BƯỚC 2: Cập nhật các thông tin cơ bản
        existingProduct.setName(dto.getName());
        existingProduct.setDescription(dto.getDescription());
        existingProduct.setMaterial(dto.getMaterial());

        // BƯỚC 3: Xử lý thay đổi Category (nếu Category ID truyền vào khác ID hiện tại)
        if (! existingProduct.getCategory().getId().equals(dto.getCategoryId())){
            Category newCategory = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("New category not found"));
            existingProduct.setCategory(newCategory);
        }

        // BƯỚC 4: Lưu vào Database (Hibernate sẽ tự hiểu đây là lệnh UPDATE)
        Product savedProduct = productRepository.save(existingProduct);

        // BƯỚC 5: Trả về DTO sau khi cập nhật thành công
        dto.setId(savedProduct.getId());
        return dto;
    }

    @Override
    @Transactional
    public void deleteProduct(Long id) {
        // BƯỚC 1: Kiểm tra sự tồn tại của sản phẩm
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product can't be deleted, which has ID:" + id);
        }

        // BƯỚC 2: Thực hiện xóa (Hard delete theo yêu cầu Sprint 1)
        // Lưu ý: Nếu có ảnh liên quan, JPA với CascadeType.ALL sẽ tự xóa ảnh trong DB
        productRepository.deleteById(id);

        // BƯỚC 3: Log thông báo hoặc xử lý logic sau khi xóa (nếu cần)
    }

}