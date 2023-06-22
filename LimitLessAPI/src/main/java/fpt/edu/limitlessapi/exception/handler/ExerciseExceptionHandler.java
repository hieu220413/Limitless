package fpt.edu.limitlessapi.exception.handler;

import fpt.edu.limitlessapi.exception.*;
import fpt.edu.limitlessapi.model.ApiError;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.IOException;
import java.util.Date;

@RestControllerAdvice
public class ExerciseExceptionHandler {

    @ExceptionHandler(ExerciseNotFoundException.class)
    public ResponseEntity<String> handleExerciseException(Exception exception){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
    }

    @ExceptionHandler(ExerciseNotFoundRuntimeException.class)
    public ResponseEntity<ApiError> handlerExerciseNotFoundRuntimeException(ExerciseNotFoundRuntimeException e) throws IOException {
        ApiError apiError = new ApiError(new Date(), e.getStatusCode().value(), e.getReason(), "exercise not found");
        return ResponseEntity.status(HttpStatus.valueOf(e.getStatusCode().value())).body(apiError);
    }

    @ExceptionHandler(InvalidExerciseInputException.class)
    public ResponseEntity<ApiError> handlerInvalidUserInputException(InvalidExerciseInputException e){
        ApiError apiError = new ApiError(new Date(), e.getStatusCode().value(), e.getReason(), "Invalid input fields", e.getErrorFields());
        return ResponseEntity.status(HttpStatusCode.valueOf(e.getStatusCode().value())).body(apiError);
    }

}
