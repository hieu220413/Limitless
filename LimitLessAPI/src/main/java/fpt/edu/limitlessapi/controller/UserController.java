package fpt.edu.limitlessapi.controller;

import fpt.edu.limitlessapi.exception.AuthFailException;
import fpt.edu.limitlessapi.model.ApiError;
import fpt.edu.limitlessapi.model.LoginBody;
import fpt.edu.limitlessapi.model.UserResponseModel;
import fpt.edu.limitlessapi.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Date;

@RestController
@RequestMapping(value = "user")
public class UserController {

    @ExceptionHandler(AuthFailException.class)
    public ResponseEntity<ApiError> handlerAuthFailException(AuthFailException e) throws IOException {
        ApiError apiError = new ApiError(new Date(), e.getStatusCode().value(), e.getReason(), "wrong password or username");
        return ResponseEntity.status(HttpStatus.valueOf(e.getStatusCode().value())).body(apiError);
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
}
