package com.minhdubai.essay.services.impl;

import com.minhdubai.essay.domain.dto.ProductDto;
import com.minhdubai.essay.domain.entities.*;
import com.minhdubai.essay.mappers.Mapper;
import com.minhdubai.essay.repositories.*;
import com.minhdubai.essay.services.ProductService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;
    private final ImageRepository imageRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final Mapper<ProductEntity, ProductDto> productMapper;


    @Override
    public ProductDto create(ProductDto product, Integer categoryId, Integer brandId) {
        ProductEntity newProduct = productMapper.mapFrom(product);

        if(categoryId != null) {
            CategoryEntity category = categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new EntityNotFoundException("Category with id = " + categoryId + " not found"));
            newProduct.setCategory(category);
        }

        if(brandId != null) {
            BrandEntity brand = brandRepository.findById(brandId)
                    .orElseThrow(() -> new EntityNotFoundException("Brand with id = " + brandId + " not found"));
            newProduct.setBrand(brand);
        }

        ProductEntity savedProduct = productRepository.save(newProduct);
        return productMapper.mapTo(savedProduct);
    }

    @Override
    public Optional<ProductDto> findById(Integer id) {
        Optional<ProductEntity> foundProduct = productRepository.findById(id);
        return foundProduct.map(productMapper::mapTo);
    }

    @Override
    public List<ProductDto> findByName(String name) {
        List<ProductEntity> foundProducts = productRepository.findByNameContaining(name);
        List<ProductDto> foundProductsDto = new ArrayList<>();

        foundProducts.forEach(product -> foundProductsDto.add(productMapper.mapTo(product)));

        return foundProductsDto;
    }

    @Override
    public List<ProductDto> findAll() {
        List<ProductEntity> allProducts = productRepository.findAll();
        List<ProductDto> allProductsDto = new ArrayList<>();

        allProducts.forEach(product -> allProductsDto.add(productMapper.mapTo(product)));

        return allProductsDto;
    }

    @Override
    public ProductDto update(Integer id, ProductDto updateFields, Integer newCategoryId, Integer newBrandId) {
        ProductEntity updateProduct = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product with id = " + id + " not found"));

        if(newCategoryId != null) {
            CategoryEntity updateCategory = categoryRepository.findById(newCategoryId)
                    .orElseThrow(() -> new EntityNotFoundException("Category with id = " + newCategoryId + " not found"));
            updateProduct.setCategory(updateCategory);
        }

        if(newBrandId != null) {
            BrandEntity updateBrand = brandRepository.findById(newBrandId)
                   .orElseThrow(() -> new EntityNotFoundException("Brand with id = " + newBrandId + " not found"));
            updateProduct.setBrand(updateBrand);
        }

        if (updateFields != null) {
            String newName = updateFields.getName();
            String newDescription = updateFields.getDescription();
            Float newLength = updateFields.getLength();
            Float newHeight = updateFields.getHeight();
            Float newWidth = updateFields.getWidth();
            Float newWeight = updateFields.getWeight();
            Integer newPrice = updateFields.getPrice();
            Integer newSalePrice = updateFields.getSalePrice();
            Integer newRemainingAmount = updateFields.getRemainingAmount();

            if(newName != null)
                updateProduct.setName(newName);
            if(newDescription != null)
                updateProduct.setDescription(newDescription);
            if(newLength != null)
                updateProduct.setLength(newLength);
            if(newHeight != null)
                updateProduct.setHeight(newHeight);
            if(newWidth != null)
                updateProduct.setWidth(newWidth);
            if(newWeight != null)
                updateProduct.setWeight(newWeight);
            if(newPrice != null)
                updateProduct.setPrice(newPrice);
            if(newSalePrice != null)
                updateProduct.setSalePrice(newSalePrice);
            if(newRemainingAmount != null)
                updateProduct.setRemainingAmount(newRemainingAmount);
        }

        ProductEntity updatedProduct = productRepository.save(updateProduct);

        return productMapper.mapTo(updatedProduct);
    }


    @Override
    public void destroy(Integer id) {
        ProductEntity deleteProduct = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product with id = " + id + " not found"));

        productRepository.delete(deleteProduct);
    }

    @Override
    public ProductDto addGallery(Integer id, List<Integer> imagesId) {
        ProductEntity updateProduct = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product with id = " + id + " not found"));


        List<ImageEntity> newGallery = updateProduct.getGallery();

        List<ImageEntity> gallery = imageRepository.findAllById(imagesId);
        newGallery.addAll(gallery);

        updateProduct.setGallery(newGallery);
        ProductEntity updatedProduct = productRepository.save(updateProduct);

        return productMapper.mapTo(updatedProduct);

    }

    @Override
    public ProductDto addComment(Integer userId, Integer productId, Integer replyId, String content) {
        ProductEntity commentProduct = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product with id = " + productId + " not found"));

        UserEntity commentUser = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User with id = " + userId + " not found"));

        CommentEntity newComment = CommentEntity.builder()
                .user(commentUser)
                .product(commentProduct)
                .content(content)
                .build();

        if (replyId != null) {
            CommentEntity reply = commentRepository.findById(replyId)
                 .orElseThrow(() -> new EntityNotFoundException("Comment with id = " + replyId + " not found"));

            newComment.setReply(reply);
        }

        commentRepository.save(newComment);
        return this.findById(productId).orElseThrow(EntityNotFoundException::new);
    }
}
