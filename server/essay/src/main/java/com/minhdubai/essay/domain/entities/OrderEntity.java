package com.minhdubai.essay.domain.entities;

import com.minhdubai.essay.domain.OrderStatus;
import com.minhdubai.essay.domain.PaymentStatus;
import com.minhdubai.essay.domain.PaymentType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "orders")
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    private UserEntity user;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    @Enumerated(EnumType.STRING)
    private PaymentType paymentType;

    private Instant paymentDate;
    private Instant deliveredDate;

    @CreationTimestamp
    private Instant createdAt;

    @UpdateTimestamp
    private Instant lastUpdatedAt;

    @OneToMany(mappedBy = "order", fetch = FetchType.EAGER)
    private List<CartAndOrderItemDetailEntity> items = new ArrayList<>();

    @ManyToOne(fetch = FetchType.EAGER)
    private AddressEntity address;
}
