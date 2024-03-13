package com.minhdubai.essay.domain.dto;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.minhdubai.essay.domain.OrderStatus;
import com.minhdubai.essay.domain.PaymentStatus;
import com.minhdubai.essay.domain.PaymentType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
public class OrderDto {

    private Integer id;

    @JsonIgnoreProperties({"orders", "cart"})
    private UserDto user;

    private OrderStatus orderStatus;
    private PaymentStatus paymentStatus;
    private PaymentType paymentType;
    private Instant paymentDate;
    private Instant deliveredDate;

    private Instant createdAt;
    private Instant lastUpdatedAt;

    @JsonIgnoreProperties({"order"})
    private List<CartAndOrderItemDetailDto> items = new ArrayList<>();
}
