package com.minhdubai.essay.domain.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "brands")
public class BrandEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    private ImageEntity logo;

    private String description;

    @OneToMany(mappedBy = "brand", fetch = FetchType.EAGER)
    private List<ProductEntity> products = new ArrayList<>();

    @CreationTimestamp
    private Instant createdAt;

    @UpdateTimestamp
    private Instant lastUpdatedAt;

    //    Set the brand of all products that belong to this brand to null
    @PreRemove
    public void setTheBrandOfAllProductsToNull() {
        for(ProductEntity product : products) {
            product.setBrand(null);
        }
    }
}
