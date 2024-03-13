package com.minhdubai.essay.repositories;

import com.minhdubai.essay.domain.entities.BrandEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BrandRepository extends JpaRepository<BrandEntity, Integer> {
    BrandEntity findByName(String name);
}
