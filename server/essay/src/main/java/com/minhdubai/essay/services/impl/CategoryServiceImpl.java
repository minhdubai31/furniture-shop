package com.minhdubai.essay.services.impl;

import com.minhdubai.essay.domain.dto.CategoryDto;
import com.minhdubai.essay.domain.entities.CategoryEntity;
import com.minhdubai.essay.mappers.Mapper;
import com.minhdubai.essay.repositories.CategoryRepository;
import com.minhdubai.essay.services.CategoryService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final Mapper<CategoryEntity, CategoryDto> categoryMapper;

    @Override
    public CategoryDto create(CategoryDto category) {
        CategoryEntity savedCategory = categoryRepository.save(categoryMapper.mapFrom(category));
        return categoryMapper.mapTo(savedCategory);
    }

    @Override
    public Optional<CategoryDto> findById(Integer id) {
        Optional<CategoryEntity> foundCategory = categoryRepository.findById(id);
        return foundCategory.map(categoryMapper::mapTo);
    }

    @Override
    public List<CategoryDto> findAll() {
        List<CategoryEntity> allCategories = categoryRepository.findAll();
        List<CategoryDto> allCategoriesDto = new ArrayList<>();

        allCategories.forEach(category -> allCategoriesDto.add(categoryMapper.mapTo(category)));

        return allCategoriesDto;
    }

    @Override
    public CategoryDto update(Integer id, CategoryDto updateFields) {
        CategoryEntity updateCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Category with id = " + id + " not found"));

        if (updateFields != null) {
            String newName = updateFields.getName();
            if(newName != null)
                updateCategory.setName(newName);
        }

        CategoryEntity updatedCategory = categoryRepository.save(updateCategory);
        return categoryMapper.mapTo(updatedCategory);
    }

    @Override
    public void destroy(Integer id) {
        CategoryEntity deleteCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Category with id =" + id + "not found"));

        categoryRepository.delete(deleteCategory);
    }
}
