package com.minhdubai.essay.services.impl;

import com.minhdubai.essay.domain.dto.BrandDto;
import com.minhdubai.essay.domain.entities.BrandEntity;
import com.minhdubai.essay.domain.entities.ImageEntity;
import com.minhdubai.essay.mappers.Mapper;
import com.minhdubai.essay.repositories.BrandRepository;
import com.minhdubai.essay.repositories.ImageRepository;
import com.minhdubai.essay.services.BrandService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class BrandServiceImpl implements BrandService {

    private final BrandRepository brandRepository;
    private final ImageRepository imageRepository;
    private final Mapper<BrandEntity, BrandDto> brandMapper;

    @Override
    public BrandDto create(BrandDto brand, Integer logoImageId) {
        BrandEntity newBrand = brandMapper.mapFrom(brand);

        if (logoImageId != null) {
            ImageEntity logoImage = imageRepository.findById(logoImageId)
                    .orElseThrow(() -> new EntityNotFoundException("Image with id " + logoImageId + " not found"));
            newBrand.setLogo(logoImage);
        }

        BrandEntity savedBrand = brandRepository.save(newBrand);
        return brandMapper.mapTo(savedBrand);
    }

    @Override
    public Optional<BrandDto> findById(Integer id) {
        Optional<BrandEntity> foundBrand = brandRepository.findById(id);
        return foundBrand.map(brandMapper::mapTo);
    }

    @Override
    public List<BrandDto> findAll() {
        List<BrandEntity> allBrands = brandRepository.findAll();
        List<BrandDto> allBrandsDto = new ArrayList<>();

        allBrands.forEach(brand -> allBrandsDto.add(brandMapper.mapTo(brand)));

        return allBrandsDto;
    }

    @Override
    public BrandDto update(Integer id, BrandDto updateFields, Integer logoImageId) {
        BrandEntity updateBrand = brandRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Brand with id " + id + " not found"));

        if (logoImageId != null) {
            ImageEntity logoImage = imageRepository.findById(logoImageId)
                    .orElseThrow(() -> new EntityNotFoundException("Image with id " + logoImageId + " not found"));
            updateBrand.setLogo(logoImage);
        }

        if (updateFields != null) {
            String newName = updateFields.getName();
            String newDescription = updateFields.getDescription();

            if (newName != null)
                updateBrand.setName(newName);
            if (newDescription != null)
                updateBrand.setDescription(newDescription);
        }

        BrandEntity updatedBrand = brandRepository.save(updateBrand);
        return brandMapper.mapTo(updatedBrand);
    }

    @Override
    public void destroy(Integer id) {
        BrandEntity deleteBrand = brandRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Brand with id " + id + " not found"));

        brandRepository.delete(deleteBrand);
    }
}
