package fpt.edu.limitlessapi.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class WorkoutNotFoundRuntimeException extends ResponseStatusException {
    public WorkoutNotFoundRuntimeException(String message) {
        super(HttpStatus.NOT_FOUND, message);
    }
}
