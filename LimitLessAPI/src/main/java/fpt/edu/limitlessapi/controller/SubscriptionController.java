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
@RequestMapping(value = "api/subscription")
public class SubscriptionController {

    @Autowired
    private SubscriptionService subscriptionService;

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseEntity<SubscriptionResponseBody> createSubscription(@Valid @RequestBody SubscriptionRequestBody subscriptionRequestBody){
        SubscriptionResponseBody subscriptionResponseBody = subscriptionService.subscriptionRequestBody(subscriptionRequestBody);
        return ResponseEntity.status(HttpStatus.OK).body(subscriptionResponseBody);
    };
}
