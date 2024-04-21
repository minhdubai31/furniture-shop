package com.minhdubai.essay.controllers.product;

import com.minhdubai.essay.domain.dto.ProductDto;
import com.minhdubai.essay.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/product")
@CrossOrigin
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(final ProductService productService) {
        this.productService = productService;
    }

    @PostMapping(path = "/")
    public ResponseEntity<ProductDto> create(@RequestBody ProductRequest request) {
        ProductDto savedProduct = productService.create(
                request.getProduct(),
                request.getCategoryId(),
                request.getBrandId(),
                request.getImageId()
        );

        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }

    @GetMapping(path = "/")
    public ResponseEntity<List<ProductDto>> findAll() {
        List<ProductDto> allProducts = productService.findAll();
        return new ResponseEntity<>(allProducts, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<ProductDto> findById(@PathVariable final Integer id) {
        Optional<ProductDto> foundProduct = productService.findById(id);

        return foundProduct.map(product -> new ResponseEntity<>(product, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping(path = "/find")
    public ResponseEntity<List<ProductDto>> findByName(@RequestParam final String name) {
        List<ProductDto> foundProducts = productService.findByName(name);

        return new ResponseEntity<>(foundProducts, HttpStatus.OK);
    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<ProductDto> update(
            @PathVariable final Integer id,
            @RequestBody final ProductRequest request
    ) {
        Optional<ProductDto> foundProduct = productService.findById(id);
        if (foundProduct.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        ProductDto updatedProduct = productService.update(
                id,
                request.getProduct(),
                request.getCategoryId(),
                request.getBrandId(),
                request.getImageId()
        );

        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<ProductDto> delete(@PathVariable final Integer id) {
        Optional<ProductDto> foundProduct = productService.findById(id);
        if (foundProduct.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        productService.destroy(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(path = "/{id}/gallery")
    public ResponseEntity<ProductDto> updateGallery(
            @PathVariable final Integer id,
            @RequestBody final List<Integer> imagesId
    ) {
        Optional<ProductDto> foundProduct = productService.findById(id);
        if (foundProduct.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        ProductDto updatedProduct = productService.updateGallery(
                id,
                imagesId
        );

        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }

    @PostMapping(path = "/{productId}/comment")
    public ResponseEntity<ProductDto> addComment(
            @PathVariable final Integer productId,
            @RequestBody final CommentRequest request
    ) {
        ProductDto commentedProduct = productService.addComment(
                request.getUserId(),
                productId,
                request.getReplyId(),
                request.getContent()
        );

        return new ResponseEntity<>(commentedProduct, HttpStatus.OK);
    }
}
