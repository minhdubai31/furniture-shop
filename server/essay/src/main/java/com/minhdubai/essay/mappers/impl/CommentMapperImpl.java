package com.minhdubai.essay.mappers.impl;

import com.minhdubai.essay.domain.dto.CommentDto;
import com.minhdubai.essay.domain.entities.CommentEntity;
import com.minhdubai.essay.mappers.Mapper;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class CommentMapperImpl implements Mapper<CommentEntity, CommentDto> {
    private final ModelMapper modelMapper;
    @Override
    public CommentDto mapTo(CommentEntity commentEntity) {
        return modelMapper.map(commentEntity, CommentDto.class);
    }

    @Override
    public CommentEntity mapFrom(CommentDto commentDto) {
        return modelMapper.map(commentDto, CommentEntity.class);
    }
}
