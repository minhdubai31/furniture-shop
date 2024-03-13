package com.minhdubai.essay.repositories;

import com.minhdubai.essay.domain.entities.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Integer> {
}
