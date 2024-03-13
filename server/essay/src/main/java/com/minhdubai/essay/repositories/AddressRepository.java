package com.minhdubai.essay.repositories;

import com.minhdubai.essay.domain.entities.AddressEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<AddressEntity, Integer> {
}
