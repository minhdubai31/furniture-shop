package com.minhdubai.essay.controllers.auth;

import com.minhdubai.essay.domain.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

    private String token;
    private String refresh_token;
    private Role role;
    private String name;
    private String username;
}
