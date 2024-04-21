package com.minhdubai.essay.domain.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.minhdubai.essay.domain.AuthProvider;
import com.minhdubai.essay.domain.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {

    private Integer id;
    private String name;
    private String username;
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String phoneNumber;
    private AuthProvider authProvider;

    @Enumerated(EnumType.STRING)
    private Role role;

    private List<AddressDto> addresses = new ArrayList<>();

    @JsonIgnore
    private List<InventoryDto> inventories = new ArrayList<>();

    private List<OrderDto> orders = new ArrayList<>();

    @JsonIgnoreProperties({"user", "order"})
    private List<CartAndOrderItemDetailDto> cart = new ArrayList<>();

    @JsonIgnoreProperties({"user"})
    private List<FavoriteDto> favorites = new ArrayList<>();

    @JsonIgnoreProperties({"user"})
    private List<CommentDto> comments = new ArrayList<>();

    private Instant createdAt;
    private Instant lastUpdatedAt;
}
