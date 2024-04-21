package com.minhdubai.essay.services;

import com.minhdubai.essay.domain.dto.CommentDto;

import java.util.Optional;

public interface CommentService {
    void destroy (Integer id);

    Optional<CommentDto> findById (Integer id);
}
