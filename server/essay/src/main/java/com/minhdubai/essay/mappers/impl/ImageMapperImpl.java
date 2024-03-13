package com.minhdubai.essay.mappers.impl;

import com.minhdubai.essay.domain.dto.ImageDto;
import com.minhdubai.essay.domain.entities.ImageEntity;
import com.minhdubai.essay.mappers.Mapper;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class ImageMapperImpl implements Mapper<ImageEntity, ImageDto> {

    private final ModelMapper modelMapper;

    @Override
    public ImageDto mapTo(ImageEntity imageEntity) {
        return modelMapper.map(imageEntity, ImageDto.class);
    }

    @Override
    public ImageEntity mapFrom(ImageDto imageDto) {
        return modelMapper.map(imageDto, ImageEntity.class);
    }
}
