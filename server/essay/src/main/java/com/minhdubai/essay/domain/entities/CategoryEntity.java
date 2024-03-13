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
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "categories")
public class CategoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @CreationTimestamp
    private Instant createdAt;

    @UpdateTimestamp
    private Instant lastUpdatedAt;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "category")
    private List<ProductEntity> products = new ArrayList<>();

//    Set the category of all products that belong to this category to null
    @PreRemove
    public void setTheCategoryOfAllProductsToNull() {
        products.forEach(product -> product.setCategory(null));
    }

}
