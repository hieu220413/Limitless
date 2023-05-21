package fpt.edu.limitlessapi.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;

public class StatisticNotFoundException extends ResponseStatusException {

    public StatisticNotFoundException(String message) {
        super(HttpStatus.NOT_FOUND, message);
    }
}
