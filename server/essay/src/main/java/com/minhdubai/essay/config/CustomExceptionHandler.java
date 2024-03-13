package com.minhdubai.essay.config;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.IOException;

@RestControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ProblemDetail handleSecurityException(Exception exception) {

        ProblemDetail errorDetail = null;

        if (exception != null) {
            errorDetail = ProblemDetail.forStatusAndDetail(
                    HttpStatusCode.valueOf(HttpServletResponse.SC_FORBIDDEN),
                    exception.getMessage()
            );
            System.out.println(exception.getCause() + ": " + exception.getMessage());
        }

        if (exception instanceof BadCredentialsException) {
            errorDetail = ProblemDetail.forStatusAndDetail(
                            HttpStatusCode.valueOf(HttpServletResponse.SC_UNAUTHORIZED),
                            exception.getMessage()
                    );
        }

        if (exception instanceof AccessDeniedException) {
            errorDetail = ProblemDetail.forStatusAndDetail(
                            HttpStatusCode.valueOf(HttpServletResponse.SC_NOT_ACCEPTABLE),
                            exception.getMessage()
                    );
        }

        if (exception instanceof SignatureException) {
            errorDetail = ProblemDetail.forStatusAndDetail(
                            HttpStatusCode.valueOf(HttpServletResponse.SC_FORBIDDEN),
                            exception.getMessage()
                    );
        }

        if (exception instanceof ExpiredJwtException) {
            errorDetail = ProblemDetail.forStatusAndDetail(
                    HttpStatusCode.valueOf(HttpServletResponse.SC_FORBIDDEN),
                    exception.getMessage()
            );
        }

        if (exception instanceof IOException) {
            errorDetail = ProblemDetail.forStatusAndDetail(
                    HttpStatusCode.valueOf(HttpServletResponse.SC_FORBIDDEN),
                    exception.getMessage()
            );
        }


        return errorDetail;
    }
}
