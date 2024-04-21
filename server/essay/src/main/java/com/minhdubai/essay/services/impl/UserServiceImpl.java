package com.minhdubai.essay.services.impl;

import com.minhdubai.essay.domain.dto.AddressDto;
import com.minhdubai.essay.domain.dto.UserDto;
import com.minhdubai.essay.domain.entities.*;
import com.minhdubai.essay.mappers.Mapper;
import com.minhdubai.essay.repositories.*;
import com.minhdubai.essay.services.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final CartAndOrderItemDetailRepository itemRepository;
    private final ProductRepository productRepository;
    private final FavoriteRepository favoriteRepository;
    private final Mapper<AddressEntity, AddressDto> addressMapper;
    private final Mapper<UserEntity, UserDto> userMapper;

    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDto create(final UserDto user) {
        final UserEntity savedUserEntity = userRepository.save(userMapper.mapFrom(user));
        return userMapper.mapTo(savedUserEntity);
    }

    @Override
    public List<UserDto> findAll() {
        List<UserEntity> allUsers = userRepository.findAll();

        // Convert user entities to user dtos
        List<UserDto> allUsersDto = new ArrayList<>();
        allUsers.forEach(user -> allUsersDto.add(userMapper.mapTo(user)));

        return allUsersDto;
    }

    @Override
    public Optional<UserDto> findById(Integer id) {
        Optional<UserEntity> foundUser = userRepository.findById(id);
        return foundUser.map(userMapper::mapTo);
    }

    @Override
    public Optional<UserDto> findByUsername(String username) {
        Optional<UserEntity> foundUser = userRepository.findByUsername(username);
        return foundUser.map(userMapper::mapTo);
    }

    @Override
    public UserDto update(Integer id, UserDto updateFields) {
        UserEntity updateUser = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User with id " + id + " not found"));

        if (updateFields != null) {
            if (updateFields.getEmail() != null) {
                updateUser.setEmail(updateFields.getEmail());
            }

            if (updateFields.getRole() != null) {
                updateUser.setRole(updateFields.getRole());
            }

            if (updateFields.getPhoneNumber() != null) {
                updateUser.setPhoneNumber(updateFields.getPhoneNumber());
            }

            if (updateFields.getPassword() != null) {
                updateUser.setPassword(passwordEncoder.encode(updateFields.getPassword()));
            }
        }

        UserEntity updatedUser = userRepository.save(updateUser);
        return userMapper.mapTo(updatedUser);
    }

    @Override
    public void destroy(Integer id) {
        UserEntity deleteUser = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User with id " + id + " not found"));

        userRepository.delete(deleteUser);
    }

    @Override
    public UserDto addAddress(Integer id, AddressDto newAddress) {
        UserEntity updateUser = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User with id " + id + " not found"));

        // Create a new address from the request
        AddressEntity newAddressEntity = addressMapper.mapFrom(newAddress);

        // Add the new address to the user
        newAddressEntity.setUser(updateUser);

        updateUser.getAddresses().add(newAddressEntity);

        userRepository.save(updateUser);
        return this.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    @Override
    public UserDto deleteAddress(Integer id, Integer addressId) {
        AddressEntity removeAddress = addressRepository.findById(addressId)
                .orElseThrow(() -> new EntityNotFoundException("Address with id = " + addressId + " not found"));

        // Check current user is owner of the address or not
        if (Objects.equals(removeAddress.getUser().getId(), id)) {
            removeAddress.setUser(null);
            addressRepository.save(removeAddress);
        } else {
            throw new RuntimeException("User with id = " + id + " is not owner of this address");
        }

        return this.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public UserDto updateCartItems(Integer id, Integer amount, Integer productId, boolean isReplace) {
        UserEntity updateUser = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User with id = " + id + " not found"));

        ProductEntity product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product with id = " + productId + "not found"));

        // Check whether the product existed in the user cart or not
        CartAndOrderItemDetailEntity existedItem = itemRepository.findByProduct_IdAndUser_Id(productId, id)
                .orElse(null);

        // If the product does not exist in the user cart, create it
        if (existedItem == null) {
            CartAndOrderItemDetailEntity newItem = CartAndOrderItemDetailEntity.builder()
                    .user(updateUser)
                    .product(product)
                    .amount(amount)
                    .build();

            itemRepository.save(newItem);
        }

        // If the product existed in the user cart, update the amount
        else {
            if(amount == 0) {
                itemRepository.delete(existedItem);
            } else {
                existedItem.setAmount(isReplace ? amount : existedItem.getAmount()+amount);
                itemRepository.save(existedItem);
            }
        }

        return this.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    @Override
    public void addToFavorites(Integer id, Integer productId) {
        UserEntity updateUser = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User with id = " + id + " not found"));

        ProductEntity product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product with id = " + productId + "not found"));

        // Check whether the product existed in the user favorites or not
        FavoriteEntity existedFavorite = favoriteRepository.findByUser_IdAndProduct_Id(id, productId);

        // If the product does not exist in the user favorites, add it
        if (existedFavorite == null) {
            FavoriteEntity newFavorite = FavoriteEntity.builder()
                    .user(updateUser)
                    .product(product)
                    .build();

            favoriteRepository.save(newFavorite);
        }
    }

    @Override
    public void removeFromFavorites(Integer id, Integer productId) {
        userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User with id = " + id + " not found"));

        productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product with id = " + productId + "not found"));

        // Check whether the product existed in the user favorites or not
        FavoriteEntity existedFavorite = favoriteRepository.findByUser_IdAndProduct_Id(id, productId);

        // If the product existed in the user favorites, remove it
        if (existedFavorite != null) {
            favoriteRepository.delete(existedFavorite);
        }
    }

    @Override
    public Optional<UserDto> loggedInUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return findByUsername(username);
    }
}
