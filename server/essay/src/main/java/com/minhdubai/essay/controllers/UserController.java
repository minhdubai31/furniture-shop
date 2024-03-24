package com.minhdubai.essay.controllers;

import com.minhdubai.essay.domain.dto.AddressDto;
import com.minhdubai.essay.domain.dto.UserDto;
import com.minhdubai.essay.services.UserService;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
        return foundUser.map(user -> new ResponseEntity<>(user, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping(path = "/{id}/address")
    public ResponseEntity<UserDto> addAddress(@PathVariable final Integer id, @RequestBody final AddressDto address) {
        Optional<UserDto> foundUser = userService.findById(id);
        if (foundUser.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        UserDto updatedUser = userService.addAddress(id, address);
        return new ResponseEntity<>(updatedUser, HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/{id}/address")
    public ResponseEntity<UserDto> deleteAddress(
            @PathVariable final Integer id,
            @RequestParam(name = "id") final Integer address_id) {
        System.out.println(SecurityContextHolder.getContext().getAuthentication().getName());

        Optional<UserDto> foundUser = userService.findById(id);
        if (foundUser.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        UserDto updatedUser = userService.deleteAddress(id, address_id);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @PostMapping(path = "/{id}/cart")
    public ResponseEntity<UserDto> updateCartItem(
            @PathVariable final Integer id,
            @RequestBody final CartRequest request) {
        Optional<UserDto> foundUser = userService.findById(id);
        if (foundUser.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        UserDto updatedUser = userService.updateCartItems(id, request.getAmount(), request.getProductId());
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @PostMapping(path = "/{id}/favorites/{productId}")
    public ResponseEntity<String> addToFavorites(@PathVariable final Integer id, @PathVariable final Integer productId) {
        Optional<UserDto> foundUser = userService.findById(id);
        if (foundUser.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        userService.addToFavorites(id, productId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}/favorites/{productId}")
    public ResponseEntity<String> removeFromFavorites(@PathVariable final Integer id, @PathVariable final Integer productId) {
        Optional<UserDto> foundUser = userService.findById(id);
        if (foundUser.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        userService.removeFromFavorites(id, productId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
