package com.minhdubai.essay.services;

import com.minhdubai.essay.domain.dto.ProductDto;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    ProductDto create(ProductDto product, Integer categoryId, Integer brandId, Integer imageId);
    Optional<ProductDto> findById(Integer id);

    List<ProductDto> findByName(String name);

    List<ProductDto> findAll();

    ProductDto update(Integer id, ProductDto updateFields, Integer newCategoryId, Integer newBrandId, Integer newImageId);

    void destroy(Integer id);

    ProductDto updateGallery(Integer id, List<Integer> imagesId);

    ProductDto addComment(Integer userId, Integer productId, Integer replyId, String content);
}
