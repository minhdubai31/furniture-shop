package com.minhdubai.essay.mappers.impl;

import com.minhdubai.essay.domain.dto.BrandDto;
import com.minhdubai.essay.domain.entities.BrandEntity;
import com.minhdubai.essay.mappers.Mapper;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class BrandMapperImpl implements Mapper<BrandEntity, BrandDto> {

    private final ModelMapper modelMapper;
    @Override
    public BrandDto mapTo(BrandEntity brandEntity) {
        return modelMapper.map(brandEntity, BrandDto.class);
    }

    @Override
    public BrandEntity mapFrom(BrandDto brandDto) {
        return modelMapper.map(brandDto, BrandEntity.class);
    }
}
