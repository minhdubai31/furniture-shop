package com.minhdubai.essay.mappers.impl;

import com.minhdubai.essay.domain.dto.AddressDto;
import com.minhdubai.essay.domain.entities.AddressEntity;
import com.minhdubai.essay.mappers.Mapper;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class AddressMapperImpl implements Mapper<AddressEntity, AddressDto> {

    private ModelMapper modelMapper;

    @Override
    public AddressDto mapTo(AddressEntity addressEntity) {
        return modelMapper.map(addressEntity, AddressDto.class);
    }

    @Override
    public AddressEntity mapFrom(AddressDto addressDto) {
        return modelMapper.map(addressDto, AddressEntity.class);
    }
}
