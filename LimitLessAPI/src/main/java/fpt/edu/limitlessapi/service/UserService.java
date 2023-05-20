package fpt.edu.limitlessapi.service;

import fpt.edu.limitlessapi.model.LoginBody;
import fpt.edu.limitlessapi.model.UserResponseModel;
import fpt.edu.limitlessapi.model.UserSignUpBody;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;

public interface UserService {
     UserResponseModel userLogin(LoginBody loginBody);

     void signUp(UserSignUpBody userSignUpBody);
}
