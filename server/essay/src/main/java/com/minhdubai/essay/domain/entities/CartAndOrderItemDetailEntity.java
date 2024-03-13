package com.minhdubai.essay.domain.entities;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "cart_and_order_item_detail")
public class CartAndOrderItemDetailEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer amount;

    @ManyToOne(fetch = FetchType.EAGER)
    private OrderEntity order;

    @ManyToOne(fetch = FetchType.EAGER)
    private ProductEntity product;

    @ManyToOne(fetch = FetchType.EAGER)
    private UserEntity user;
}
