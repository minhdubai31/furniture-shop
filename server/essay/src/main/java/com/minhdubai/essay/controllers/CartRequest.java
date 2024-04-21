package com.minhdubai.essay.controllers;

import lombok.Data;

@Data
public class CartRequest {
    private Integer amount;
    private Integer productId;
    private boolean replace = false;
}
