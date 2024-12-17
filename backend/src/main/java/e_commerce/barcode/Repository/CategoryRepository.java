package e_commerce.barcode.Repository;

import e_commerce.barcode.Entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    boolean existsById(Integer categoryId);
}
