package com.minhdubai.essay.services;

import com.minhdubai.essay.domain.dto.CategoryDto;

import java.util.List;
import java.util.Optional;

public interface CategoryService {
    CategoryDto create(CategoryDto category);

    Optional<CategoryDto> findById(Integer id);

    List<CategoryDto> findAll();


    CategoryDto update(Integer id, CategoryDto updateFields);

    void destroy(Integer id);

}
