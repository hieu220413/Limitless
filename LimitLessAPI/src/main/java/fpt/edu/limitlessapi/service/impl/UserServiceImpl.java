package fpt.edu.limitlessapi.service.impl;

import fpt.edu.limitlessapi.entity.Users;
import fpt.edu.limitlessapi.exception.AuthFailException;
import fpt.edu.limitlessapi.exception.InvalidUserInputException;
import fpt.edu.limitlessapi.model.LoginBody;
import fpt.edu.limitlessapi.model.UserResponseModel;
import fpt.edu.limitlessapi.model.UserSignUpBody;
import fpt.edu.limitlessapi.repository.UserRepository;
import fpt.edu.limitlessapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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
        throw new AuthFailException("UNAUTHORIZED");
    }

    @Override
    public void signUp(UserSignUpBody userSignUpBody) {
        HashMap errorFields = new HashMap<>();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        Pattern pattern = Pattern.compile("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$");
        Matcher matcher = pattern.matcher(userSignUpBody.getPassword());

        if(!matcher.matches()){
            errorFields.put("passwordError", "at least 8 characters, 1 digit, 1 uppercase and lowercase letter");
        }

        pattern = Pattern.compile("^[\\w!#$%&amp;'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&amp;'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$");
        matcher = pattern.matcher(userSignUpBody.getEmail());

        if(!matcher.matches()){
            errorFields.put("emailError", "Invalid email format");
        }

        pattern = Pattern.compile("^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$");
        matcher = pattern.matcher(userSignUpBody.getPhone());
        if(!matcher.matches()){
            errorFields.put("phoneError", "Invalid phone number format");
        }

        pattern = Pattern.compile("^[A-Za-z][A-Za-z0-9_]{7,29}$");
        matcher = pattern.matcher(userSignUpBody.getUsername());
        if(!matcher.matches()){
            errorFields.put("usernameError", "Invalid username format");
        }

        if(userRepository.findByUsername(userSignUpBody.getUsername()) != null){
            errorFields.put("usernameError", "Duplicate username");
        }

        if(errorFields.size() > 0){
            throw new InvalidUserInputException("UNPROCESSABLE_ENTITY", errorFields);
        }

        Users users = Users.builder()
                        .username(userSignUpBody.getUsername())
                                .password(encoder.encode(userSignUpBody.getPassword()))
                                        .email(userSignUpBody.getEmail())
                                                .phone(userSignUpBody.getPhone())
                                                        .status(1)
                                                                .build();
        userRepository.save(users);
    }
}
