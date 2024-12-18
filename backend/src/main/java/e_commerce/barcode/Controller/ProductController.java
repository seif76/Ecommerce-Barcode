package e_commerce.barcode.Controller;

import e_commerce.barcode.Entity.Category;
import e_commerce.barcode.Entity.Products;
import e_commerce.barcode.Repository.CategoryRepository;
import e_commerce.barcode.Repository.ProductRepository;
import e_commerce.barcode.Srevice.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;
    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping
    public List<Products> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{barcode}")
    public ResponseEntity<Products> getProductByBarcode(@PathVariable String barcode) {
        return productService.getProductByBarcode(barcode)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /*@PostMapping("/add")
    public Products addProduct(@RequestBody Products product) {
        return productService.saveProduct(product);
    }*/

    @PostMapping("/addProduct")
    public ResponseEntity<?> addProduct(@RequestBody Products product) {
        if (product.getCategory() != null && product.getCategory().getCategoryId() != null) {
            Optional<Category> categoryOptional = categoryRepository.findById(product.getCategory().getCategoryId());
            if (categoryOptional.isEmpty()) {
                return ResponseEntity.badRequest().body("Category not found.");
            }
            product.setCategory(categoryOptional.get());
        } else {
            product.setCategory(null);
        }
        Products savedProduct = productService.saveProduct(product);
        return ResponseEntity.ok(savedProduct);
    }
}
