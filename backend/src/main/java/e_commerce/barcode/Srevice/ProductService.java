package e_commerce.barcode.Srevice;

import e_commerce.barcode.Entity.Products;
import e_commerce.barcode.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Products>getAllProducts(){
        return productRepository.findAll();
    }

    public Optional<Products>getProductByBarcode(String barcode){
        return productRepository.findById(barcode);
    }

    public Products saveProduct(Products product) {
        return productRepository.save(product);
    }

    public void deleteProduct(String barcode) {
        productRepository.deleteById(barcode);
    }

}
