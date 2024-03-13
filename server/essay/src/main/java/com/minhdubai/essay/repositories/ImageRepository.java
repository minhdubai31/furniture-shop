package com.minhdubai.essay.repositories;

import com.minhdubai.essay.domain.entities.ImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<ImageEntity, Integer> {
}
