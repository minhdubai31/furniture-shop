package com.minhdubai.essay.domain.dto;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.voodoodyne.jackson.jsog.JSOGGenerator;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = JSOGGenerator.class)
public class CategoryDto {

    private Integer id;
    private String name;

    @JsonIgnoreProperties({"category"})
    private List<ProductDto> products = new ArrayList<>();

    private Instant createdAt;
    private Instant lastUpdatedAt;
}
