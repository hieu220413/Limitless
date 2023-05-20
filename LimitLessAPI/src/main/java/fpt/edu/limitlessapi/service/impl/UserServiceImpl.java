package fpt.edu.limitlessapi.service.impl;

import fpt.edu.limitlessapi.entity.Users;
import fpt.edu.limitlessapi.model.LoginBody;
import fpt.edu.limitlessapi.model.UserResponseModel;
import fpt.edu.limitlessapi.repository.UserRepository;
import fpt.edu.limitlessapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserResponseModel userLogin(LoginBody loginBody) {
        Users userEntity = userRepository.findByUsernameAndActive(loginBody.getUsername());

        if(userEntity != null) {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            if(encoder.matches(loginBody.getPassword(),userEntity.getPassword())){
                UserResponseModel userLoginResponse = new UserResponseModel(userEntity);
                return userLoginResponse;
            }
        }
        return null;
    }
}
