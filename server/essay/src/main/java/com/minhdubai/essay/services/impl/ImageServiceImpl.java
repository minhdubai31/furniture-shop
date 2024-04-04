package com.minhdubai.essay.services.impl;

import com.google.common.io.Files;
import com.minhdubai.essay.domain.dto.ImageDto;
import com.minhdubai.essay.domain.entities.ImageEntity;
import com.minhdubai.essay.mappers.Mapper;
import com.minhdubai.essay.repositories.ImageRepository;
import com.minhdubai.essay.services.ImageService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.name.Rename;
import org.apache.commons.io.FileUtils;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.io.File;
import java.io.IOException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    private final ImageRepository imageRepository;
    private final Mapper<ImageEntity, ImageDto> imageMapper;

    private final String uploadPath = new FileSystemResource("").getFile().getAbsolutePath()
            + "/src/main/resources/static/images/";
    private final String urlPath = "/resources/images/";


    private String getNewFileName(String originalFileName) {
        String nameWithoutExtension = Files.getNameWithoutExtension(originalFileName);
        String extension = Files.getFileExtension(originalFileName);
        return nameWithoutExtension + "_" + System.currentTimeMillis() + "." + extension;
    }

    @Override
    public ImageDto create(MultipartFile image) throws IOException {

        String originalFileName = image.getOriginalFilename();

        // Build the path to save the file
        String filePath = uploadPath + getNewFileName(originalFileName);

        // Target the file to be saved
        File targetFile = new File(filePath);


        // Save the file to the specified path
        image.transferTo(targetFile);

        Thumbnails.of(targetFile)
                .size(300, 300)
                .toFiles(Rename.PREFIX_DOT_THUMBNAIL);

        // Convert file size to readable
        double size = FileUtils.sizeOf(targetFile);
        String sizeWithUnit = Double.toString(size) + " bytes";
        if (size >= 1024) {
            size = size / 1024.0;
            sizeWithUnit = new DecimalFormat("#.0#").format(size) + " KB";
        }
        if (size >= 1024) {
            size = size / 1024.0;
            sizeWithUnit = new DecimalFormat("#.0#").format(size) + " MB";
        }

        // Create information to database
        ImageDto imageDto = ImageDto.builder()
                .name(originalFileName)
                .path(urlPath + targetFile.getName())
                .thumbnailPath(urlPath + "thumbnail." + targetFile.getName())
                .width(ImageIO.read(targetFile).getWidth())
                .height(ImageIO.read(targetFile).getHeight())
                .size(sizeWithUnit)
                .build();

        ImageEntity savedImage = imageRepository.save(imageMapper.mapFrom(imageDto));
        return imageMapper.mapTo(savedImage);
    }

    @Override
    public List<ImageDto> findAll() {
        List<ImageEntity> allImages = imageRepository.findAll();
        List<ImageDto> allImagesDto = new ArrayList<>();

        allImages.forEach(image -> allImagesDto.add(imageMapper.mapTo(image)));

        return allImagesDto;
    }

    @Override
    public ImageDto update(Integer id, ImageDto updateFields) {
        ImageEntity updateImage = imageRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Image with id= " + id + " not found"));

        if (updateFields != null) {
            String newName = updateFields.getName();
            if (newName!= null) {
                updateImage.setName(newName);
            }
        }

        ImageEntity updatedImage = imageRepository.save(updateImage);
        return imageMapper.mapTo(updatedImage);
    }

    @Override
    public void destroy(Integer id) {
        ImageEntity deleteImage = imageRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Image with id= " + id + " not found"));

        String imageFilePath = uploadPath + deleteImage.getPath().substring(urlPath.length() -1);
        String thumbnailFilePath = uploadPath + deleteImage.getThumbnailPath().substring(urlPath.length() -1);

        File imageFile = new File(imageFilePath);
        File thumbnailFile = new File(thumbnailFilePath);

        imageRepository.delete(deleteImage);
        if (!(imageFile.delete() && thumbnailFile.delete())) {
            throw new RuntimeException("Could not delete image file!");
        }
    }
}
