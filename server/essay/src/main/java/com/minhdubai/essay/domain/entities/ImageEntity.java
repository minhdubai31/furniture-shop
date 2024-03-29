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
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "images")
public class ImageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String path;
    private String thumbnailPath;

    @ManyToMany(fetch = FetchType.EAGER, mappedBy = "gallery")
    private List<ProductEntity> products = new ArrayList<>();

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "logo")
    private List<BrandEntity> brand = new ArrayList<>();

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "image", cascade = CascadeType.PERSIST)
    private List<ProductEntity> productImages = new ArrayList<>();

    @CreationTimestamp
    private Instant createdAt;

    @UpdateTimestamp
    private Instant lastUpdatedAt;

    @PreRemove
    public void setAllProductImagesToNull() {
        productImages.forEach(product -> product.setImage(null));
    }
}
