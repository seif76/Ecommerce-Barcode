package e_commerce.barcode.Entity;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "products")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
public class Products {
    @Id
    @Column(name = "barcode", nullable = false, unique = true)
    private String barcode;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "category_id", nullable = true)
    private Category category;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private Double weight;

    @Column(nullable = false)
    private Integer quantity;
}

