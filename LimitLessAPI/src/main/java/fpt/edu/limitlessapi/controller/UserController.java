package fpt.edu.limitlessapi.controller;

import fpt.edu.limitlessapi.exception.AuthFailException;
import fpt.edu.limitlessapi.exception.InvalidUserInputException;
import fpt.edu.limitlessapi.model.*;
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
import java.util.UUID;

@RestController
@RequestMapping(value = "api/user")
public class UserController {

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

    @RequestMapping(value =  "/{id}/updateAdditonalDetail", method = RequestMethod.PUT)
    public ResponseEntity<UserResponseModel> updateAdditionalDetail(@Valid @RequestBody UserAdditionalDetailRequestBody userAdditionalDetailRequestBody, @PathVariable UUID id){
        return ResponseEntity.status(HttpStatus.OK).body(userService.updateAdditionalDetail(userAdditionalDetailRequestBody, id));
    }
}
