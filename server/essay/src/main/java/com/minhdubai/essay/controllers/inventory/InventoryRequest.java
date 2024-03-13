package com.minhdubai.essay.controllers.inventory;

import com.minhdubai.essay.domain.dto.InventoryDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InventoryRequest {
    private InventoryDto inventory;
    private Integer productId;
    private Integer userId;
}
