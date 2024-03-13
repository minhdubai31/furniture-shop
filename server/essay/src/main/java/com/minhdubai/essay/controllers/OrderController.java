package com.minhdubai.essay.controllers;

import com.minhdubai.essay.domain.dto.OrderDto;
import com.minhdubai.essay.domain.dto.UserDto;
import com.minhdubai.essay.services.OrderService;
import com.minhdubai.essay.services.UserService;
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
    public ResponseEntity<List<OrderDto>> findAll () {
        return new ResponseEntity<>(orderService.findAll(), HttpStatus.OK);
    }

    @PostMapping(path = "/cart/{userId}")
    public ResponseEntity<OrderDto> transferCartToOrder(@PathVariable final Integer userId) {
        OrderDto newOrder = orderService.transferCartToOrder(userId);
        return new ResponseEntity<>(newOrder, HttpStatus.OK);
    }

    @PostMapping(path = "/buynow/{productId}")
    public ResponseEntity<OrderDto> buyNowOrder(@PathVariable final Integer productId) {
        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        UserDto currentUser = userService.findByUsername(userName).orElseThrow();

        OrderDto newOrder = orderService.buyNowOrder(currentUser.getId(), productId);
        return new ResponseEntity<>(newOrder, HttpStatus.OK);
    }
}
