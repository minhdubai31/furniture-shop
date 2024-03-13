package com.minhdubai.essay.repositories;

import com.minhdubai.essay.domain.entities.FavoriteEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoriteRepository extends JpaRepository<FavoriteEntity, Integer> {
    FavoriteEntity findByUser_IdAndProduct_Id(Integer userId, Integer productId);
}
