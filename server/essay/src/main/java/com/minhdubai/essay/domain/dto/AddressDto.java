package com.minhdubai.essay.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddressDto {

    private Integer id;
    private String province;
    private String district;
    private String commune;
    private String addressDetail;

    private Instant createdAt;
    private Instant lastUpdatedAt;
}
