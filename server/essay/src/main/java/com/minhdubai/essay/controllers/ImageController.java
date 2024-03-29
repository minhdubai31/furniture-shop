package com.minhdubai.essay.controllers;

import com.minhdubai.essay.domain.dto.ImageDto;
import com.minhdubai.essay.services.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/image")
@RequiredArgsConstructor
@CrossOrigin
public class ImageController {

    private final ImageService imageService;

    @GetMapping(path = "/")
    public ResponseEntity<List<ImageDto>> findAll() {
        List<ImageDto> allImages = imageService.findAll();
        return new ResponseEntity<>(allImages, HttpStatus.OK);
    }

    @PostMapping(path = "/")
    public ResponseEntity<ImageDto> create(@RequestParam("image") MultipartFile image) throws IOException {
        ImageDto savedImage = imageService.create(image);
        return new ResponseEntity<>(savedImage, HttpStatus.CREATED);
    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<ImageDto> update(@PathVariable Integer id, @RequestBody ImageDto updateFields) {
        ImageDto updatedImage = imageService.update(id, updateFields);
        return new ResponseEntity<>(updatedImage, HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<ImageDto> destroy(@PathVariable Integer id) {
        imageService.destroy(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
