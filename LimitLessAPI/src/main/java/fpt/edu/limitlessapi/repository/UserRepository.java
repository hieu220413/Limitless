package fpt.edu.limitlessapi.repository;

import fpt.edu.limitlessapi.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<Users, UUID> {
     Users findByUsername(String username);

     @Query(value = "SELECT * FROM users WHERE ( username=:username OR phone=:username ) AND ( status = 0 OR status = 2)",nativeQuery = true)
     Users findByUsernameAndActive(String username);

     @Query(value = "SELECT * FROM users WHERE email=:email AND ( status = 0 OR status = 2)",nativeQuery = true)
     Users findByEmailAndActive(String email);

     @Query(value = "SELECT * FROM users WHERE phone=:phone AND ( status = 0 OR status = 2) ",nativeQuery = true)
     Users findByPhoneAndActive(String phone);

     @Query(value = "SELECT * FROM users WHERE user_id=:userId AND ( status = 0 OR status = 2)",nativeQuery = true)
     Users findByIdAndActive(UUID userId);
}
