package e_commerce.barcode.Repository;

import e_commerce.barcode.Entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Products,String> {
}
