package fpt.edu.limitlessapi.service;

import fpt.edu.limitlessapi.entity.Role;
import fpt.edu.limitlessapi.entity.Users;
import fpt.edu.limitlessapi.model.UserDetailsPrincipalModel;
import fpt.edu.limitlessapi.repository.UserRepository;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserSecurityService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        String test = new BCryptPasswordEncoder().encode("123admin");
        Users userEntity = userRepository.findByUsernameAndActive(username);
        Role role = new Role();
        if (userEntity != null){
            role = (Role) Hibernate.unproxy(userEntity.getRole());
        }
        UserDetailsPrincipalModel user = UserDetailsPrincipalModel.builder()
                .username(userEntity.getUsername())
                .password(userEntity.getPassword())
                .role(role.getName())
                .build();
//        UserDetailsPrincipalModel user = null;
        UserDetailsPrincipal userDetailsPrincipal = new UserDetailsPrincipal(user);
        return userDetailsPrincipal;
    }
}
