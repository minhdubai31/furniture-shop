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
@Table(name = "products")
public class ProductEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String description;

    private Float length;
    private Float width;
    private Float height;
    private Float weight;

    private Integer price;
    private Integer salePrice;
    private Integer remainingAmount;
    private Integer favoritesAmount;

    @ManyToOne(fetch = FetchType.EAGER)
    private ImageEntity image;

    @CreationTimestamp
    private Instant createdAt;

    @UpdateTimestamp
    private Instant lastUpdatedAt;

    @ManyToOne(fetch = FetchType.EAGER)
    private CategoryEntity category;

    @OneToMany(mappedBy = "product", fetch = FetchType.EAGER)
    private List<InventoryEntity> inventories = new ArrayList<>();

    @ManyToOne(fetch = FetchType.EAGER)
    private BrandEntity brand;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<ImageEntity> gallery = new ArrayList<>();

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "product")
    private List<FavoriteEntity> favorites = new ArrayList<>();

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "product")
    private List<CommentEntity> comments = new ArrayList<>();
}
