package com.minhdubai.essay.services;

import com.minhdubai.essay.domain.dto.InventoryDto;

import java.util.List;

public interface InventoryService {
    InventoryDto create(InventoryDto inventory, Integer productId, Integer userId);
    List<InventoryDto> findAll();
    List<InventoryDto> findByProductId(Integer productId);
    List<InventoryDto> findByUserId(Integer userId);

    List<InventoryDto> findByProductIdAndUserId(Integer productId, Integer userId);
}
