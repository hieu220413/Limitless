package fpt.edu.limitlessapi.exception.handler;

import fpt.edu.limitlessapi.exception.DuplicateSubscriptionException;
import fpt.edu.limitlessapi.exception.InvalidSubscriptionInputException;
import fpt.edu.limitlessapi.model.ApiError;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Date;

@RestControllerAdvice
public class SubscriptionExceptionHandler {

    @ExceptionHandler(InvalidSubscriptionInputException.class)
    public ResponseEntity<ApiError> handlerInvalidSubscriptionInput(InvalidSubscriptionInputException e){
        ApiError apiError = new ApiError(new Date(), e.getStatusCode().value(), e.getReason(), "Invalid input fields", e.getErrorFields());
        return ResponseEntity.status(HttpStatusCode.valueOf(e.getStatusCode().value())).body(apiError);
    }
    @ExceptionHandler(DuplicateSubscriptionException.class)
    public ResponseEntity<ApiError> handlerDuplicateSubscriptionException(DuplicateSubscriptionException e){
        ApiError apiError = new ApiError(new Date(), e.getStatusCode().value(), e.getReason(), "Duplicate active subscription so can not create new subscription");
        return ResponseEntity.status(HttpStatusCode.valueOf(e.getStatusCode().value())).body(apiError);
    }
}
