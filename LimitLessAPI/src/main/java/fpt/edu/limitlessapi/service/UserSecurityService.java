package fpt.edu.limitlessapi.service;

import fpt.edu.limitlessapi.entity.Users;
import fpt.edu.limitlessapi.model.UserDetailsPrincipalModel;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserSecurityService implements UserDetailsService {
//    @Autowired
//    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        String test = new BCryptPasswordEncoder().encode("123admin");
//        UserEntity userEntity = userRepository.findByUsername(username);
        Users userEntity = null;
//        UserDetailsPrincipalModel user = UserDetailsPrincipalModel.builder()
//                .username(userEntity.getUsername())
//                .password(userEntity.getPassword())
//                .role(User.RoleEnum.valueOf(userEntity.getRole()))
//                .build();
        UserDetailsPrincipalModel user = null;
        UserDetailsPrincipal userDetailsPrincipal = new UserDetailsPrincipal(user);
        return userDetailsPrincipal;
    }
}
