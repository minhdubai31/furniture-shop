package com.minhdubai.essay.domain.dto;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
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
public class BrandDto {

    private Integer id;

    private String name;

    @JsonIgnoreProperties({"brand", "products"})
    private ImageDto logo;

    private String description;

    @JsonIgnoreProperties({"brand"})
    private List<ProductDto> products = new ArrayList<>();

    private Instant createdAt;
    private Instant lastUpdatedAt;
}
