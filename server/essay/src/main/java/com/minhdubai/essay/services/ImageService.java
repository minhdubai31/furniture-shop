package com.minhdubai.essay.services;

import com.minhdubai.essay.domain.dto.ImageDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ImageService {
    ImageDto create(MultipartFile image) throws IOException;
    List<ImageDto> findAll();
    ImageDto update(Integer id, ImageDto updateFields);
    void destroy(Integer id);
}
