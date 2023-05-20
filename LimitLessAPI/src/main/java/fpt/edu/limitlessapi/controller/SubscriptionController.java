package fpt.edu.limitlessapi.controller;

import fpt.edu.limitlessapi.exception.DuplicateSubscriptionException;
import fpt.edu.limitlessapi.exception.InvalidSubscriptionInputException;
import fpt.edu.limitlessapi.model.ApiError;
import fpt.edu.limitlessapi.model.SubscriptionRequestBody;
import fpt.edu.limitlessapi.model.SubscriptionResponseBody;
import fpt.edu.limitlessapi.service.SubscriptionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping(value = "subscription")
public class SubscriptionController {

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

    @Autowired
    private SubscriptionService subscriptionService;

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseEntity<SubscriptionResponseBody> createSubscription(@Valid @RequestBody SubscriptionRequestBody subscriptionRequestBody){
        SubscriptionResponseBody subscriptionResponseBody = subscriptionService.subscriptionRequestBody(subscriptionRequestBody);
        return ResponseEntity.status(HttpStatus.OK).body(subscriptionResponseBody);
    };
}
