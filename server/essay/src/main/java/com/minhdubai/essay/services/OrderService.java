package com.minhdubai.essay.services;

import com.minhdubai.essay.domain.dto.OrderDto;

import java.util.List;

public interface OrderService {
    List<OrderDto> findAll();

    List<OrderDto> findAllByUserId(Integer userId);

    OrderDto transferCartToOrder(Integer userId, Integer addressId);

    OrderDto updateOrder(Integer id, OrderDto updateFields);

    OrderDto buyNowOrder(Integer userId, Integer productId, Integer quantity, Integer addressId);
}
