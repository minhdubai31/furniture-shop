package com.minhdubai.essay.controllers.brand;

import com.minhdubai.essay.domain.dto.BrandDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BrandRequest {
    private BrandDto brand;
    private Integer logoImageId;
}
