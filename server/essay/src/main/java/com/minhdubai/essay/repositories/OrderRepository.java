package com.minhdubai.essay.repositories;

import com.minhdubai.essay.domain.entities.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<OrderEntity, Integer> {
}
