package com.minhdubai.essay.services;

import com.minhdubai.essay.domain.dto.OrderDto;

import java.util.List;

public interface OrderService {
    List<OrderDto> findAll();

    OrderDto transferCartToOrder(Integer userId);

    OrderDto buyNowOrder(Integer userId, Integer productId);
}
