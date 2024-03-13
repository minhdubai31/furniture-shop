package com.minhdubai.essay.services.impl;

import com.minhdubai.essay.domain.dto.AddressDto;
import com.minhdubai.essay.domain.entities.AddressEntity;
import com.minhdubai.essay.mappers.Mapper;
import com.minhdubai.essay.repositories.AddressRepository;
import com.minhdubai.essay.services.AddressService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;
    private final Mapper<AddressEntity, AddressDto> addressMapper;

    @Override
    public AddressDto create(AddressDto address) {
        AddressEntity addressEntity = addressMapper.mapFrom(address);
        AddressEntity savedAddressEntity = addressRepository.save(addressEntity);
        return addressMapper.mapTo(savedAddressEntity);
    }
}
