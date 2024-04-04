package com.minhdubai.essay.config;

import ch.qos.logback.core.testUtil.RandomUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.minhdubai.essay.controllers.auth.AuthenticationResponse;
import com.minhdubai.essay.controllers.auth.RegisterRequest;
import com.minhdubai.essay.domain.AuthProvider;
import com.minhdubai.essay.domain.Role;
import com.minhdubai.essay.domain.dto.UserDto;
import com.minhdubai.essay.domain.entities.UserEntity;
import com.minhdubai.essay.mappers.Mapper;
import com.minhdubai.essay.services.AuthenticationService;
import com.minhdubai.essay.services.JwtService;
import com.minhdubai.essay.services.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final Mapper<UserEntity, UserDto> userMapper;

    private AuthProvider getAuthProvider(HttpServletRequest request) {
        String requestUri = request.getRequestURI();
        String provider = requestUri.substring(requestUri.lastIndexOf("/") + 1);

        return switch (provider) {
            case "google" -> AuthProvider.GOOGLE;
            case "github" -> AuthProvider.GITHUB;
            case "facebook" -> AuthProvider.FACEBOOK;
            default -> AuthProvider.LOCAL;
        };
    }


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User user = (OAuth2User) authentication.getPrincipal();

        String username = "";
        String email = "";
        String name = "";

        // Handle each provider has its own response data type
        switch(getAuthProvider(request)) {
            case AuthProvider.GOOGLE -> {
                 username = "google_" + user.getAttribute("email");
                 email = user.getAttribute("email");
                 name = user.getAttribute("name");
            }
            case AuthProvider.GITHUB -> {
                username = "github_" + user.getAttribute("login");
                name = user.getAttribute("login");
            }
            case AuthProvider.FACEBOOK -> {
                username = "facebook_"+ user.getAttribute("email");
                email = user.getAttribute("email");
                name = user.getAttribute("name");
            }
            default -> {
                throw new RuntimeException("Invalid auth provider");
            }
        }

        String accessToken, refreshToken;
        AuthenticationResponse authenticationResponse;

        UserDto foundUser = userService.findByUsername(username).orElse(null);
        if (foundUser == null) {
            UserDto newUser = UserDto.builder()
                    .name(name)
                    .email(email)
                    .username(username)
                    // Add random password to prevent login through normal authentication
                    .password(passwordEncoder.encode(
                            RandomStringUtils.random(12, true, true)
                    ))
                    .authProvider(getAuthProvider(request))
                    .role(Role.USER)
                    .build();

            UserDto createdUser = userService.create(newUser);
            accessToken = jwtService.generateToken(userMapper.mapFrom(createdUser));
            refreshToken = jwtService.generateRefreshToken(userMapper.mapFrom(createdUser));

            authenticationResponse = AuthenticationResponse.builder()
                    .username(createdUser.getUsername())
                    .name(createdUser.getName())
                    .token(accessToken)
                    .refresh_token(refreshToken)
                    .build();
        } else {
            accessToken = jwtService.generateToken(userMapper.mapFrom(foundUser));
            refreshToken = jwtService.generateRefreshToken(userMapper.mapFrom(foundUser));

            authenticationResponse = AuthenticationResponse.builder()
                    .username(foundUser.getUsername())
                    .name(foundUser.getName())
                    .token(accessToken)
                    .refresh_token(refreshToken)
                    .build();
        }

        // Redirect to react app to store access token and refresh token
        response.setHeader("Location", "http://localhost:3000/oauth2?token="+accessToken+"&refresh="+refreshToken);
        response.setStatus(HttpServletResponse.SC_FOUND);
    }
}
