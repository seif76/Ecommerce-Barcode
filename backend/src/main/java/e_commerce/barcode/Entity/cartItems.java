package e_commerce.barcode.Entity;

import jakarta.persistence.*;
import lombok.*;
@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
public class cartItems {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cart;

    @Column(nullable = false)
    private String productId;

    private int quantity;
}
