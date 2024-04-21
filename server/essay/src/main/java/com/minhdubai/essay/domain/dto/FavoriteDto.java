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

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = JSOGGenerator.class)
public class FavoriteDto {
    private Integer id;

    private Instant createdAt;
    private Instant lastUpdatedAt;

    @JsonIgnoreProperties({"favorites"})
    private UserDto user;

    @JsonIgnoreProperties({"favorites"})
    private ProductDto product;
}
