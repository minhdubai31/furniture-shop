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
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIdentityInfo(generator = JSOGGenerator.class)
public class CommentDto {
    private Integer id;
    private String content;

    @JsonIgnoreProperties({"comments", "addresses", "orders", "favorites", "cart"})
    private UserDto user;

    @JsonIgnoreProperties("comments")
    private ProductDto product;

    private List<CommentDto> reply = new ArrayList<>();
    private Integer replyCommentId;

    private Instant createdAt;
    private Instant lastUpdatedAt;
}
