package fpt.edu.limitlessapi.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class AuthFailException extends ResponseStatusException {
    public AuthFailException(String message) {
        super(HttpStatus.UNAUTHORIZED, message);
    }
}