package com.minhdubai.essay.mappers.impl;

import com.minhdubai.essay.domain.dto.CartAndOrderItemDetailDto;
import com.minhdubai.essay.domain.entities.CartAndOrderItemDetailEntity;
import com.minhdubai.essay.mappers.Mapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CartAndOrderItemDetailMapperImpl implements Mapper<CartAndOrderItemDetailEntity, CartAndOrderItemDetailDto> {

    private final ModelMapper modelMapper;

    @Override
    public CartAndOrderItemDetailDto mapTo(CartAndOrderItemDetailEntity cartAndOrderItemDetailEntity) {
        return modelMapper.map(cartAndOrderItemDetailEntity, CartAndOrderItemDetailDto.class);
    }

    @Override
    public CartAndOrderItemDetailEntity mapFrom(CartAndOrderItemDetailDto cartAndOrderItemDetailDto) {
        return modelMapper.map(cartAndOrderItemDetailDto, CartAndOrderItemDetailEntity.class);
    }
}
