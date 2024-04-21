package com.minhdubai.essay.controllers;

import lombok.Data;

@Data
public class OrderRequest {
    private Integer userId;
    private Integer productId;
    private Integer amount;
    private Integer addressId;
}
