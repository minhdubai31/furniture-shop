package com.minhdubai.essay.services.impl;

import com.minhdubai.essay.domain.dto.InventoryDto;
import com.minhdubai.essay.domain.entities.InventoryEntity;
import com.minhdubai.essay.domain.entities.ProductEntity;
import com.minhdubai.essay.domain.entities.UserEntity;
import com.minhdubai.essay.mappers.Mapper;
import com.minhdubai.essay.repositories.InventoryRepository;
import com.minhdubai.essay.repositories.ProductRepository;
import com.minhdubai.essay.repositories.UserRepository;
import com.minhdubai.essay.services.InventoryService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InventoryServiceImpl implements InventoryService {

    private final InventoryRepository inventoryRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final Mapper<InventoryEntity, InventoryDto> inventoryMapper;

    @Override
    public InventoryDto create(InventoryDto inventory, Integer productId, Integer userId) {
        InventoryEntity newInventory = inventoryMapper.mapFrom(inventory);

        UserEntity manager = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User with id = " + userId + " not found"));

        ProductEntity product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product with id = " + productId + " not found"));

//        Set remaining amount of product
        Integer currentRemainingAmount = product.getRemainingAmount();
        currentRemainingAmount += inventory.getDifferenceAmount();
        product.setRemainingAmount(currentRemainingAmount);
        productRepository.save(product);

//        Set what product and who is created this change
        newInventory.setProduct(product);
        newInventory.setManager(manager);

        InventoryEntity savedInventory = inventoryRepository.save(newInventory);
        return inventoryMapper.mapTo(savedInventory);
    }

    @Override
    public List<InventoryDto> findAll() {
        List<InventoryEntity> allInventories = inventoryRepository.findAll();
        List<InventoryDto> allInventoriesDto = new ArrayList<>();
        allInventories.forEach(inventory -> allInventoriesDto.add(inventoryMapper.mapTo(inventory)));

        return allInventoriesDto;
    }

    @Override
    public List<InventoryDto> findByProductId(Integer productId) {
        List<InventoryEntity> foundInventories = inventoryRepository.findAllByProduct_Id(productId);
        List<InventoryDto> inventoriesDto = new ArrayList<>();

        foundInventories.forEach(inventory -> inventoriesDto.add(inventoryMapper.mapTo(inventory)));
        return inventoriesDto;
    }

    @Override
    public List<InventoryDto> findByUserId(Integer userId) {
        List<InventoryEntity> foundInventories = inventoryRepository.findAllByManager_Id(userId);
        List<InventoryDto> inventoriesDto = new ArrayList<>();

        foundInventories.forEach(inventory -> inventoriesDto.add(inventoryMapper.mapTo(inventory)));
        return inventoriesDto;
    }

    @Override
    public List<InventoryDto> findByProductIdAndUserId(Integer productId, Integer userId) {
        List<InventoryEntity> foundInventories = inventoryRepository.findAllByProduct_IdAndManager_Id(productId, userId);
        List<InventoryDto> inventoriesDto = new ArrayList<>();

        foundInventories.forEach(inventory -> inventoriesDto.add(inventoryMapper.mapTo(inventory)));
        return inventoriesDto;
    }
}
