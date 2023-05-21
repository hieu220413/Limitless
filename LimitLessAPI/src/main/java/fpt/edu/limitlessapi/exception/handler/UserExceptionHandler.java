package fpt.edu.limitlessapi.exception.handler;

import fpt.edu.limitlessapi.exception.AuthFailException;
import fpt.edu.limitlessapi.exception.InvalidUserInputException;
import fpt.edu.limitlessapi.exception.UserNotFoundException;
import fpt.edu.limitlessapi.model.ApiError;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.IOException;
import java.util.Date;

@RestControllerAdvice
public class UserExceptionHandler {

    @ExceptionHandler(AuthFailException.class)
    public ResponseEntity<ApiError> handlerAuthFailException(AuthFailException e) throws IOException {
        ApiError apiError = new ApiError(new Date(), e.getStatusCode().value(), e.getReason(), "wrong password or username");
        return ResponseEntity.status(HttpStatus.valueOf(e.getStatusCode().value())).body(apiError);
    }
    @ExceptionHandler(InvalidUserInputException.class)
    public ResponseEntity<ApiError> handlerInvalidUserInputException(InvalidUserInputException e){
        ApiError apiError = new ApiError(new Date(), e.getStatusCode().value(), e.getReason(), "Invalid input fields", e.getErrorFields());
        return ResponseEntity.status(HttpStatusCode.valueOf(e.getStatusCode().value())).body(apiError);
    }
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiError> handlerUserNotFoundException(UserNotFoundException e) throws IOException {
        ApiError apiError = new ApiError(new Date(), e.getStatusCode().value(), e.getReason(), "user not found");
        return ResponseEntity.status(HttpStatus.valueOf(e.getStatusCode().value())).body(apiError);
    }
}
