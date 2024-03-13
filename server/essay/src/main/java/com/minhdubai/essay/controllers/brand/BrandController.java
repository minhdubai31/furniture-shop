package com.minhdubai.essay.controllers.brand;

import com.minhdubai.essay.domain.dto.BrandDto;
import com.minhdubai.essay.domain.dto.ProductDto;
import com.minhdubai.essay.services.BrandService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/brand")
@RequiredArgsConstructor
public class BrandController {
    private final BrandService brandService;

    @PostMapping(path = "/")
    public ResponseEntity<BrandDto> create(@RequestBody final BrandRequest request) {
        BrandDto savedBrand = brandService.create(request.getBrand(), request.getLogoImageId());
        return new ResponseEntity<>(savedBrand, HttpStatus.CREATED);
    }

    @GetMapping(path = "/")
    public ResponseEntity<List<BrandDto>> findAll() {
        return new ResponseEntity<>(brandService.findAll(), HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<BrandDto> findById(@PathVariable final Integer id) {
        Optional<BrandDto> foundBrand = brandService.findById(id);
        return foundBrand.map(brand -> new ResponseEntity<>(brand, HttpStatus.OK))
             .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping(path = "/{id}/products")
    public ResponseEntity<List<ProductDto>> findProducts(@PathVariable final Integer id) {
        Optional<BrandDto> foundBrand = brandService.findById(id);
        return foundBrand.map(brand -> new ResponseEntity<>(brand.getProducts(), HttpStatus.OK))
           .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<BrandDto> update(@PathVariable final Integer id, @RequestBody final BrandRequest updateFields) {
        Optional<BrandDto> foundBrand = brandService.findById(id);
        if(foundBrand.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        BrandDto updatedBrand = brandService.update(id, updateFields.getBrand(), updateFields.getLogoImageId());
        return new ResponseEntity<>(updatedBrand, HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable final Integer id) {
        Optional<BrandDto> foundBrand = brandService.findById(id);
        if(foundBrand.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        brandService.destroy(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
