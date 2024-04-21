package com.minhdubai.essay.services.impl;

import com.minhdubai.essay.domain.dto.CommentDto;
import com.minhdubai.essay.domain.entities.CommentEntity;
import com.minhdubai.essay.mappers.Mapper;
import com.minhdubai.essay.repositories.CommentRepository;
import com.minhdubai.essay.services.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final Mapper<CommentEntity, CommentDto> commentMapper;
    @Override
    public void destroy(Integer id) {
        CommentEntity foundComment = commentRepository.findById(id).orElseThrow();
        if(foundComment.getReplyCommentId() != null) {
            CommentEntity parentComment = commentRepository.findById(foundComment.getReplyCommentId()).orElseThrow();
            parentComment.getReply().removeIf(comment -> Objects.equals(comment.getId(), id));
            commentRepository.save(parentComment);
        }

        commentRepository.deleteById(id);
    }

    @Override
    public Optional<CommentDto> findById(Integer id) {
        Optional<CommentEntity> foundComment = commentRepository.findById(id);
        return foundComment.map(commentMapper::mapTo);
    }
}
