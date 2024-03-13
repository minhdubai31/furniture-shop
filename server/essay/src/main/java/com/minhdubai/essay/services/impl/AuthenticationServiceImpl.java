package com.minhdubai.essay.services.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.minhdubai.essay.controllers.auth.AuthenticationRequest;
import com.minhdubai.essay.controllers.auth.AuthenticationResponse;
import com.minhdubai.essay.controllers.auth.RegisterRequest;
import com.minhdubai.essay.domain.Role;
import com.minhdubai.essay.domain.dto.UserDto;
import com.minhdubai.essay.domain.entities.UserEntity;
import com.minhdubai.essay.mappers.Mapper;
import com.minhdubai.essay.services.AuthenticationService;
import com.minhdubai.essay.services.JwtService;
import com.minhdubai.essay.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final Mapper<UserEntity, UserDto> userMapper;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthenticationResponse register(RegisterRequest request) {
        UserDto newUser = UserDto.builder()
                .name(request.getName())
                .email(request.getEmail())
                .username(request.getUsername())
                .birthday(request.getBirthday())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        userService.create(newUser);

        var jwtToken = jwtService.generateToken(userMapper.mapFrom(newUser));
        var refreshToken = jwtService.generateRefreshToken(userMapper.mapFrom(newUser));

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .refresh_token(refreshToken)
                .build();
    }

    @Override
    public AuthenticationResponse authentication(AuthenticationRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        var user = userService.findByUsername(request.getUsername())
                .orElseThrow();

        var jwtToken = jwtService.generateToken(userMapper.mapFrom(user));
        var refreshToken = jwtService.generateRefreshToken(userMapper.mapFrom(user));

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .refresh_token(refreshToken)
                .build();
    }

    @Override
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        final String authHeader = request.getHeader("Authorization");
        final String refreshToken;
        final String username;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }

//      Remove "Bearer " from header
        refreshToken = authHeader.substring(7);
        username = jwtService.extractUsername(refreshToken);

        if (username != null) {
            UserDetails userDetails = userMapper.mapFrom(userService.findByUsername(username).orElseThrow());
            if (jwtService.isTokenValid(refreshToken, userDetails)) {
                var jwtToken = jwtService.generateToken(userDetails);
                var authResponse = AuthenticationResponse.builder()
                        .token(jwtToken)
                        .refresh_token(refreshToken)
                        .build();

                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }
}
