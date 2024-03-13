package com.minhdubai.essay.services;

import com.minhdubai.essay.domain.dto.AddressDto;
import com.minhdubai.essay.domain.dto.UserDto;

import java.util.List;
import java.util.Optional;

public interface UserService {
    UserDto create(UserDto new_user);

    List<UserDto> findAll();

    Optional<UserDto> findById(Integer id);

    Optional<UserDto> findByUsername(String username);

    UserDto addAddress(Integer id, AddressDto newAddress);
    UserDto deleteAddress(Integer id, Integer addressId);

    UserDto updateCartItems(Integer id, Integer amount, Integer productId);

    void addToFavorites(Integer id, Integer productId);

    void removeFromFavorites(Integer id, Integer productId);
}
