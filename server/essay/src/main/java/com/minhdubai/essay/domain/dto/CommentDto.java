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
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
public class CommentDto {
    private Integer id;
    private String content;

    @JsonIgnoreProperties({"comments", "addresses", "orders", "favorites", "cart"})
    private UserDto user;

    @JsonIgnoreProperties("comments")
    private ProductDto product;

    private CommentDto reply;

    private Instant createdAt;
    private Instant lastUpdatedAt;
}
