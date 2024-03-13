package com.minhdubai.essay.domain.dto;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
public class ProductDto {

    private Integer id;
    private String name;
    private String description;

    private Float length;
    private Float width;
    private Float height;
    private Float weight;

    private Integer price;
    private Integer salePrice;
    private Integer remainingAmount = 0;

    @JsonIgnoreProperties("products")
    private CategoryDto category;

    @JsonIgnore
    private List<InventoryDto> inventories = new ArrayList<>();

    @JsonIgnoreProperties("products")
    private BrandDto brand;

    @JsonIgnoreProperties("products")
    private List<ImageDto> gallery = new ArrayList<>();

    @JsonIgnore
    private List<FavoriteDto> favorites = new ArrayList<>();

    @JsonIgnoreProperties("product")
    private List<CommentDto> comments = new ArrayList<>();

    private Integer favoritesAmount = 0;

    private Instant createdAt;
    private Instant lastUpdatedAt;
}
