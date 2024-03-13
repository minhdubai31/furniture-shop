package com.minhdubai.essay.repositories;

import com.minhdubai.essay.domain.entities.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<CommentEntity, Integer> {
}
