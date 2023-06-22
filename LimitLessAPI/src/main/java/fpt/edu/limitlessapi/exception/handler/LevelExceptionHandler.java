package fpt.edu.limitlessapi.exception.handler;

import fpt.edu.limitlessapi.exception.LevelNotFoundException;
import fpt.edu.limitlessapi.exception.UserNotFoundException;
import fpt.edu.limitlessapi.model.ApiError;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.IOException;
import java.util.Date;

@RestControllerAdvice
public class LevelExceptionHandler {
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiError> handlerLevelNotFoundException(LevelNotFoundException e) throws IOException {
        ApiError apiError = new ApiError(new Date(), e.getStatusCode().value(), e.getReason(), "level not found");
        return ResponseEntity.status(HttpStatus.valueOf(e.getStatusCode().value())).body(apiError);
    }
}
