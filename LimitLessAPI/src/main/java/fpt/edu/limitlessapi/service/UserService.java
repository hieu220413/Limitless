package fpt.edu.limitlessapi.service;

import fpt.edu.limitlessapi.model.LoginBody;
import fpt.edu.limitlessapi.model.UserAdditionalDetailRequestBody;
import fpt.edu.limitlessapi.model.UserResponseModel;
import fpt.edu.limitlessapi.model.UserSignUpBody;

import java.util.UUID;

public interface UserService {
     UserResponseModel userLogin(LoginBody loginBody);

     void signUp(UserSignUpBody userSignUpBody);

    UserResponseModel updateAdditionalDetail(UserAdditionalDetailRequestBody userAdditionalDetailRequestBody, UUID id);
}
