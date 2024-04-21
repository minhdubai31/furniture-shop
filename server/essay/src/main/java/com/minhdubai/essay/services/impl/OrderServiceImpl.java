package com.minhdubai.essay.services.impl;

import com.minhdubai.essay.domain.OrderStatus;
import com.minhdubai.essay.domain.PaymentStatus;
import com.minhdubai.essay.domain.dto.OrderDto;
import com.minhdubai.essay.domain.entities.*;
import com.minhdubai.essay.mappers.Mapper;
import com.minhdubai.essay.repositories.*;
import com.minhdubai.essay.services.OrderService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final ProductRepository productRepository;
    private final CartAndOrderItemDetailRepository itemRepository;
    private final Mapper<OrderEntity, OrderDto> orderMapper;

    @Override
    public List<OrderDto> findAll() {
        List<OrderEntity> allOrders = orderRepository.findAll();

        // Convert order entities to order dtos
        List<OrderDto> allOrdersDto = new ArrayList<>();

        allOrders.forEach(order -> allOrdersDto.add(orderMapper.mapTo(order)));
        return allOrdersDto;
    }

    @Override
    public List<OrderDto> findAllByUserId(Integer userId) {
        List<OrderEntity> allOrders = orderRepository.findAllByUserId(userId);

        // Convert order entities to order dtos
        List<OrderDto> allOrdersDto = new ArrayList<>();

        allOrders.forEach(order -> allOrdersDto.add(orderMapper.mapTo(order)));
        return allOrdersDto;
    }

    @Override
    public OrderDto transferCartToOrder(Integer userId, Integer addressId) {

        UserEntity orderedUser = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User with id = " + userId + " not found"));

        AddressEntity address = addressRepository.findById(addressId)
                .orElseThrow();

        // Create a new order for the user
        OrderEntity newOrder = OrderEntity.builder()
                .orderStatus(OrderStatus.PENDING)
                .paymentStatus(PaymentStatus.UNPAID)
                .user(orderedUser)
                .address(address)
                .build();

        // Save the new order to database
        orderRepository.save(newOrder);

        // Get items from user cart transfer to new order
        List<CartAndOrderItemDetailEntity> cartItems = orderedUser.getCart();

        cartItems.forEach(item -> {
            item.setOrder(newOrder);
            item.setUser(null);
            item.getProduct().setRemainingAmount(item.getProduct().getRemainingAmount() - item.getAmount());
            productRepository.save(item.getProduct());
            itemRepository.save(item);
        });

        // Get new order with items added
        OrderEntity savedOrder = orderRepository.findById(newOrder.getId()).orElseThrow();
        return orderMapper.mapTo(savedOrder);

    }

    @Override
    public OrderDto updateOrder(Integer id, OrderDto updateFields) {
        OrderEntity updateOrder = orderRepository.findById(id).orElseThrow();

        if(updateFields.getOrderStatus() != null)
            updateOrder.setOrderStatus(updateFields.getOrderStatus());
        if(updateFields.getPaymentStatus()!= null)
            updateOrder.setPaymentStatus(updateFields.getPaymentStatus());
        if(updateFields.getPaymentDate() != null)
            updateOrder.setPaymentDate(updateFields.getPaymentDate());
        if(updateFields.getDeliveredDate() != null)
            updateOrder.setDeliveredDate(updateFields.getDeliveredDate());
        if(updateFields.getPaymentType() != null)
            updateOrder.setPaymentType(updateFields.getPaymentType());

        orderRepository.save(updateOrder);
        return null;
    }

    @Override
    public OrderDto buyNowOrder(Integer userId, Integer productId, Integer quantity, Integer addressId) {
        UserEntity orderedUser = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User with id = " + userId + "not found"));

        ProductEntity productEntity = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product with id = " + productId + " not found"));

        AddressEntity address = addressRepository.findById(addressId)
                .orElseThrow();
        // Create a new order with one product for the user
        OrderEntity newOrder = OrderEntity.builder()
              .orderStatus(OrderStatus.PENDING)
              .paymentStatus(PaymentStatus.UNPAID)
              .address(address)
              .user(orderedUser)
              .build();

        orderRepository.save(newOrder);

        productEntity.setRemainingAmount(productEntity.getRemainingAmount() - quantity);
        productRepository.save(productEntity);

        // Save item detail of the new order to database
        CartAndOrderItemDetailEntity newItem = CartAndOrderItemDetailEntity.builder()
                .product(productEntity)
                .order(newOrder)
                .amount(quantity)
                .build();

        itemRepository.save(newItem);

        // Get new order with items added
        OrderEntity savedOrder = orderRepository.findById(newOrder.getId()).orElseThrow();
        return orderMapper.mapTo(savedOrder);
    }
}
