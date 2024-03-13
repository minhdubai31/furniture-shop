package com.minhdubai.essay.services;

import com.minhdubai.essay.domain.dto.BrandDto;

import java.util.List;
import java.util.Optional;

public interface BrandService {
    BrandDto create(BrandDto brand, Integer logoImageId);
    Optional<BrandDto> findById(Integer id);
    List<BrandDto> findAll();
    BrandDto update(Integer id, BrandDto updateFields, Integer logoImageId);
    void destroy(Integer id);

}
