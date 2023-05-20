package fpt.edu.limitlessapi.repository;

import fpt.edu.limitlessapi.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<Users, UUID> {
     Users findByUsername(String username);

     @Query(value = "SELECT * FROM users WHERE username=:username AND status = 1",nativeQuery = true)
     Users findByUsernameAndActive(String username);
}
