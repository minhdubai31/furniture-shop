package com.minhdubai.essay.controllers.product;

import lombok.Data;

@Data
public class CommentRequest {
    private Integer userId;
    private Integer replyId;

    private String content;
}
