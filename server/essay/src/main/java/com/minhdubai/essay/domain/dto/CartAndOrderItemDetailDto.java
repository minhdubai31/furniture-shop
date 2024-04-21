package com.minhdubai.essay.domain.dto;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.voodoodyne.jackson.jsog.JSOGGenerator;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonIdentityInfo(generator = JSOGGenerator.class)
public class CartAndOrderItemDetailDto {
    private Integer id;

    private Integer amount;

    @JsonIgnore
    private OrderDto order;

    @JsonIgnoreProperties({"gallery", "comments"})
    private ProductDto product;

    @JsonIgnore
    private UserDto user;
}
