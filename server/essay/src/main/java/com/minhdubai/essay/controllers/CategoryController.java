package com.minhdubai.essay.controllers;

import com.minhdubai.essay.domain.dto.CategoryDto;
import com.minhdubai.essay.domain.dto.ProductDto;
import com.minhdubai.essay.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping(path = "/")
    public ResponseEntity<CategoryDto> create(@RequestBody final CategoryDto category) {
        CategoryDto savedCategory = categoryService.create(category);
        return new ResponseEntity<>(savedCategory, HttpStatus.CREATED);
    }

    @GetMapping(path = "/")
    public ResponseEntity<List<CategoryDto>> findAll() {
        return new ResponseEntity<>(categoryService.findAll(), HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<CategoryDto> findById(@PathVariable final Integer id) {
        Optional<CategoryDto> foundCategory = categoryService.findById(id);
        return foundCategory.map(category -> new ResponseEntity<>(category, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping(path = "/{id}/products")
    public ResponseEntity<List<ProductDto>> findProducts(@PathVariable final Integer id) {
        Optional<CategoryDto> foundCategory = categoryService.findById(id);
        return foundCategory.map(categoryDto -> new ResponseEntity<>(categoryDto.getProducts(), HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));

    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<CategoryDto> update(@PathVariable final Integer id, @RequestBody final CategoryDto updateFields) {
        Optional<CategoryDto> foundCategory = categoryService.findById(id);
        if(foundCategory.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        CategoryDto updatedCategory = categoryService.update(id, updateFields);
        return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<CategoryDto> delete(@PathVariable final Integer id) {
        Optional<CategoryDto> foundCategory = categoryService.findById(id);
        if(foundCategory.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        categoryService.destroy(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
