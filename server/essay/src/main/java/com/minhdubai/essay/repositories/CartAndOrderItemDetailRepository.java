package com.minhdubai.essay.repositories;

import com.minhdubai.essay.domain.entities.CartAndOrderItemDetailEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartAndOrderItemDetailRepository extends JpaRepository<CartAndOrderItemDetailEntity, Integer> {
    Optional<CartAndOrderItemDetailEntity> findByProduct_IdAndUser_Id(Integer productId, Integer userId);
}
