package fpt.edu.limitlessapi.service;

import fpt.edu.limitlessapi.model.LoginBody;
import fpt.edu.limitlessapi.model.UserResponseModel;

public interface UserService {
    public UserResponseModel userLogin(LoginBody loginBody);
}
