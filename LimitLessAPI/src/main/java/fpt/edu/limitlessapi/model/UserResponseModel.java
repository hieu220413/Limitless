package fpt.edu.limitlessapi.model;

import fpt.edu.limitlessapi.entity.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponseModel {

    public UserResponseModel(Users users) {
        this.userId = users.getUserId();
        this.username = users.getUsername();
        this.email = users.getEmail();
        this.fullName = users.getFullName();
        this.phone = users.getPhone();
        this.doB = users.getDoB();
        this.age = users.getAge();
        this.weight = users.getWeight();
        this.height = users.getHeight();
        this.level = users.getLevel();
        this.gender = users.getGender();
        this.status = users.getStatus();
    }

    private UUID userId;

    private String username;

    private String email;

    private String fullName;

    private String phone;

    private Date doB;

    private int age;

    private int weight;

    private int height;

    private String level;

    private int gender;

    private int status;
}
