package com.minhdubai.essay.controllers;

import com.minhdubai.essay.domain.Role;
import com.minhdubai.essay.domain.dto.AddressDto;
import com.minhdubai.essay.domain.dto.UserDto;
import com.minhdubai.essay.services.UserService;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(final UserService userService) {
        this.userService = userService;
    }

    private boolean isHasPermission(Integer id) {
        Optional<UserDto> foundUser = userService.findById(id);
        return foundUser.isPresent()
                && Objects.equals(id, userService.loggedInUser().map(UserDto::getId).orElse(null))
                || userService.loggedInUser().map(UserDto::getRole).orElse(null) == Role.ADMIN;
    }

    @PostMapping(path = "/")
    public ResponseEntity<UserDto> create(@RequestBody final UserDto user) {
        final UserDto savedUser = userService.create(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @GetMapping(path = "/")
    @RolesAllowed("ADMIN")
    public ResponseEntity<List<UserDto>> findAll() {
        return new ResponseEntity<>(userService.findAll(), HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<UserDto> findById(@PathVariable final Integer id) {
        Optional<UserDto> foundUser = userService.findById(id);
        if (isHasPermission(id)) {
            return foundUser.map(user -> new ResponseEntity<>(user, HttpStatus.OK))
                    .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
        }

        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<UserDto> update(@PathVariable final Integer id, @RequestBody final UserDto updateFields) {
        if (isHasPermission(id)) {
            UserDto updatedUser = userService.update(id, updateFields);
            return new ResponseEntity<>(updatedUser, HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<UserDto> destroy(@PathVariable final Integer id) {
        if (isHasPermission(id)) {
            userService.destroy(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @PostMapping(path = "/{id}/address")
    public ResponseEntity<UserDto> addAddress(@PathVariable final Integer id, @RequestBody final AddressDto address) {
        if (isHasPermission(id)) {
            UserDto updatedUser = userService.addAddress(id, address);
            return new ResponseEntity<>(updatedUser, HttpStatus.CREATED);

        }
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);

    }

    @DeleteMapping(path = "/{id}/address")
    public ResponseEntity<UserDto> deleteAddress(
            @PathVariable final Integer id,
            @RequestParam(name = "id") final Integer address_id) {
        if (isHasPermission(id)) {
            UserDto updatedUser = userService.deleteAddress(id, address_id);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @PostMapping(path = "/{id}/cart")
    public ResponseEntity<UserDto> updateCartItem(
            @PathVariable final Integer id,
            @RequestBody final CartRequest request) {
        if (isHasPermission(id)) {
            UserDto updatedUser = userService.updateCartItems(
                    id,
                    request.getAmount(),
                    request.getProductId(),
                    request.isReplace()
            );
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @PostMapping(path = "/{id}/favorites/{productId}")
    public ResponseEntity<String> addToFavorites(@PathVariable final Integer id, @PathVariable final Integer productId) {
        if (isHasPermission(id)) {
            userService.addToFavorites(id, productId);
            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @DeleteMapping(path = "/{id}/favorites/{productId}")
    public ResponseEntity<String> removeFromFavorites(@PathVariable final Integer id, @PathVariable final Integer productId) {
        if (isHasPermission(id)) {
            userService.removeFromFavorites(id, productId);
            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
