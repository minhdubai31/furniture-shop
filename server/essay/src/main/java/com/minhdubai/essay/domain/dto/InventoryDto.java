package com.minhdubai.essay.domain.dto;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
public class InventoryDto {

    private Integer id;

    @JsonIgnoreProperties({"inventories"})
    private ProductDto product;

    private Integer differenceAmount;
    private String note;

    @JsonIgnoreProperties({"inventories"})
    private UserDto manager;

    private Instant createdAt;
    private Instant lastUpdatedAt;
}
