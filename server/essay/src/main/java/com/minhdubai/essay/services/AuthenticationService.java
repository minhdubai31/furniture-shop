package com.minhdubai.essay.services;

import com.minhdubai.essay.controllers.auth.AuthenticationRequest;
import com.minhdubai.essay.controllers.auth.AuthenticationResponse;
import com.minhdubai.essay.controllers.auth.RegisterRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public interface AuthenticationService {

    AuthenticationResponse register(RegisterRequest request);

    AuthenticationResponse authentication(AuthenticationRequest request);

    void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException;

}
