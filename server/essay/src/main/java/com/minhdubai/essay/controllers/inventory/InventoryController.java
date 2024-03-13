package com.minhdubai.essay.controllers.inventory;

import com.minhdubai.essay.domain.dto.InventoryDto;
import com.minhdubai.essay.services.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {
    private final InventoryService inventoryService;

    @PostMapping(path = "/")
    public ResponseEntity<InventoryDto> create(@RequestBody final InventoryRequest request) {
        InventoryDto savedInventory = inventoryService.create(
                request.getInventory(),
                request.getProductId(),
                request.getUserId()
        );

        return new ResponseEntity<>(savedInventory, HttpStatus.CREATED);
    }

    @GetMapping(path = "/")
    public ResponseEntity<List<InventoryDto>> findAll() {
        List<InventoryDto> inventories = inventoryService.findAll();

        return new ResponseEntity<>(inventories, HttpStatus.OK);
    }

    @GetMapping(path = "")
    public ResponseEntity<List<InventoryDto>> find(
            @RequestParam(required = false, name = "user") Integer userId,
            @RequestParam(required = false, name = "product") Integer productId
    ) {
        List<InventoryDto> inventories = new ArrayList<>();

        if (userId != null && productId != null)
             inventories = inventoryService.findByProductIdAndUserId(productId, userId);

        if (userId == null)
             inventories = inventoryService.findByProductId(productId);

        if (productId == null)
            inventories = inventoryService.findByUserId(userId);

        return new ResponseEntity<>(inventories, HttpStatus.OK);
    }
}
