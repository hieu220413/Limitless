package fpt.edu.limitlessapi.controller;

import fpt.edu.limitlessapi.exception.AuthFailException;
import fpt.edu.limitlessapi.exception.InvalidUserInputException;
import fpt.edu.limitlessapi.model.ApiError;
import fpt.edu.limitlessapi.model.LoginBody;
import fpt.edu.limitlessapi.model.UserResponseModel;
import fpt.edu.limitlessapi.model.UserSignUpBody;
import fpt.edu.limitlessapi.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;

@RestController
@RequestMapping(value = "user")
public class UserController {

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

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<UserResponseModel> loginUser(@Valid @RequestBody LoginBody loginBody){
        UserResponseModel userResponseModel = userService.userLogin(loginBody);
        HttpHeaders headers = new HttpHeaders();
        headers.setBasicAuth(loginBody.getUsername(), loginBody.getPassword());
        return ResponseEntity.status(HttpStatus.OK).headers(headers).body(userResponseModel);
    }

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public ResponseEntity<HashMap> SignUp(@Valid @RequestBody UserSignUpBody userSignUpBody) {
        userService.signUp(userSignUpBody);
        HashMap<String,String> message = new HashMap<>();
        message.put("message", "sign up successfully");
        return ResponseEntity.status(HttpStatus.OK).body(message);
    }
}
