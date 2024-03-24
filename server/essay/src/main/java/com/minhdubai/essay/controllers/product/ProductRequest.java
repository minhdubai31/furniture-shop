package com.minhdubai.essay.controllers.product;

import com.minhdubai.essay.domain.dto.ProductDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductRequest {
    private ProductDto product;
    private Integer categoryId;
    private Integer brandId;
    private Integer imageId;
}
