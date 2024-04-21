package com.minhdubai.essay.repositories;

import com.minhdubai.essay.domain.entities.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<ProductEntity, Integer> {
    List<ProductEntity> findByNameContaining(String name);

    @Modifying
    @Query("DELETE FROM ProductEntity p WHERE p.id = :id")
    void customDeleteById(@Param("id") Integer id);
}
