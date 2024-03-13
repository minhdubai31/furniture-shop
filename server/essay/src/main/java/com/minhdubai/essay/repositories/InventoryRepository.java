package com.minhdubai.essay.repositories;

import com.minhdubai.essay.domain.entities.InventoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InventoryRepository extends JpaRepository<InventoryEntity, Integer> {
    List<InventoryEntity> findAllByProduct_Id(Integer productId);
    List<InventoryEntity> findAllByManager_Id(Integer userId);

    List<InventoryEntity> findAllByProduct_IdAndManager_Id(Integer productId, Integer userId);
}
