package com.minhdubai.essay.mappers.impl;

import com.minhdubai.essay.domain.dto.InventoryDto;
import com.minhdubai.essay.domain.entities.InventoryEntity;
import com.minhdubai.essay.mappers.Mapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class InventoryMapperImpl implements Mapper<InventoryEntity, InventoryDto> {

    private final ModelMapper modelMapper;
    @Override
    public InventoryDto mapTo(InventoryEntity inventoryEntity) {
        return modelMapper.map(inventoryEntity, InventoryDto.class);
    }

    @Override
    public InventoryEntity mapFrom(InventoryDto inventoryDto) {
        return modelMapper.map(inventoryDto, InventoryEntity.class);
    }
}
