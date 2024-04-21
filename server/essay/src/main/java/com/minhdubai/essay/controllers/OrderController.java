package com.minhdubai.essay.controllers;

import com.minhdubai.essay.domain.dto.OrderDto;
import com.minhdubai.essay.domain.dto.UserDto;
import com.minhdubai.essay.services.OrderService;
import com.minhdubai.essay.services.UserService;
import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;

    @GetMapping(path = "/")
    @RolesAllowed("ADMIN")
    public ResponseEntity<List<OrderDto>> findAll () {
        return new ResponseEntity<>(orderService.findAll(), HttpStatus.OK);
    }

    @GetMapping(path = "/{userId}")
    public ResponseEntity<List<OrderDto>> findAllByUserId (@PathVariable final Integer userId) {
        return new ResponseEntity<>(orderService.findAllByUserId(userId), HttpStatus.OK);
    }

    @PostMapping(path = "/cart/{userId}")
    public ResponseEntity<OrderDto> transferCartToOrder(@PathVariable final Integer userId, @RequestBody Integer addressId) {
        OrderDto newOrder = orderService.transferCartToOrder(userId, addressId);
        return new ResponseEntity<>(newOrder, HttpStatus.OK);
    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<OrderDto> updateOrder(@PathVariable final Integer id, @RequestBody OrderDto updateFields) {
        OrderDto newOrder = orderService.updateOrder(id, updateFields);
        return new ResponseEntity<>(newOrder, HttpStatus.OK);
    }

    @PostMapping(path = "/buynow")
    public ResponseEntity<OrderDto> buyNowOrder(@RequestBody final OrderRequest request) {
        OrderDto newOrder = orderService.buyNowOrder(request.getUserId(), request.getProductId(), request.getAmount(), request.getAddressId());
        return new ResponseEntity<>(newOrder, HttpStatus.OK);
    }
}
