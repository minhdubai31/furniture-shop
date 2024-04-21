package com.minhdubai.essay.controllers;

import com.minhdubai.essay.domain.Role;
import com.minhdubai.essay.domain.dto.CommentDto;
import com.minhdubai.essay.domain.dto.UserDto;
import com.minhdubai.essay.services.CommentService;
import com.minhdubai.essay.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api/comment")
@RequiredArgsConstructor
@CrossOrigin
public class CommentController {
    private final CommentService commentService;
    private final UserService userService;

    private boolean isHasPermission(Integer id) {
        Optional<CommentDto> foundComment = commentService.findById(id);
        return foundComment.isPresent()
                && Objects.equals(foundComment.map(CommentDto::getUser).map(UserDto::getId).orElse(null), userService.loggedInUser().map(UserDto::getId).orElse(null))
                || foundComment.isPresent()
                && userService.loggedInUser().map(UserDto::getRole).orElse(null) == Role.ADMIN;
    }

    @DeleteMapping(path = "/{id}")
    ResponseEntity<CommentDto> deleteComment (@PathVariable final Integer id) {
        if(isHasPermission(id)) {
            commentService.destroy(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }
}
