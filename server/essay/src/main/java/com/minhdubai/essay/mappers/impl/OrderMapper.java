package com.minhdubai.essay.mappers.impl;

import com.minhdubai.essay.domain.dto.OrderDto;
import com.minhdubai.essay.domain.entities.OrderEntity;
import com.minhdubai.essay.mappers.Mapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OrderMapper implements Mapper<OrderEntity, OrderDto> {

    private final ModelMapper modelMapper;

    @Override
    public OrderDto mapTo(OrderEntity orderEntity) {
        return modelMapper.map(orderEntity, OrderDto.class);
    }

    @Override
    public OrderEntity mapFrom(OrderDto orderDto) {
        return modelMapper.map(orderDto, OrderEntity.class);
    }
}
