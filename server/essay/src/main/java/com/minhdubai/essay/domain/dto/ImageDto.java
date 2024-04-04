package com.minhdubai.essay.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonProperty;
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
    private String thumbnailPath;
    private Integer width, height;
    private String size;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<ProductDto> products = new ArrayList<>();

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<ProductDto> productImages = new ArrayList<>();

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private BrandDto brand;

    @JsonFormat(pattern = "HH:mm:ss dd-MM-yyyy", timezone = "Asia/Bangkok")
    private Instant createdAt;
    private Instant lastUpdatedAt;
}
