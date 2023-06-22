package fpt.edu.limitlessapi.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class ExerciseNotFoundRuntimeException extends ResponseStatusException {
    public ExerciseNotFoundRuntimeException(String message) {
        super(HttpStatus.NOT_FOUND, message);
    }
}
