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
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
public class ImageDto {

    private Integer id;
    private String name;
    private String path;

    @JsonIgnoreProperties({"gallery", "image"})
    private List<ProductDto> products = new ArrayList<>();

    @JsonIgnoreProperties({"gallery", "image"})
    private List<ProductDto> productImages = new ArrayList<>();

    @JsonIgnoreProperties("logo")
    private BrandDto brand;

    private Instant createdAt;
    private Instant lastUpdatedAt;
}
