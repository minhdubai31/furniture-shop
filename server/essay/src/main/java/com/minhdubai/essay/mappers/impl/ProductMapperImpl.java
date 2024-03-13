package com.minhdubai.essay.mappers.impl;

import com.minhdubai.essay.domain.dto.ProductDto;
import com.minhdubai.essay.domain.entities.ProductEntity;
import com.minhdubai.essay.mappers.Mapper;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class ProductMapperImpl implements Mapper<ProductEntity, ProductDto> {
    private final ModelMapper modelMapper;

    @Override
    public ProductDto mapTo(ProductEntity productEntity) {
        return modelMapper.map(productEntity, ProductDto.class);
    }

    @Override
    public ProductEntity mapFrom(ProductDto productDto) {
        return modelMapper.map(productDto, ProductEntity.class);
    }
}
