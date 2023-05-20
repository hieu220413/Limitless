package fpt.edu.limitlessapi.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;

public class DuplicateSubscriptionException extends ResponseStatusException {
    public DuplicateSubscriptionException(String message) {
        super(HttpStatus.FORBIDDEN, message);
    }
}
