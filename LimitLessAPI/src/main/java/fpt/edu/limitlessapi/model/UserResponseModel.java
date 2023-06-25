package fpt.edu.limitlessapi.model;

import fpt.edu.limitlessapi.entity.Exercise;
import fpt.edu.limitlessapi.entity.Users;
import fpt.edu.limitlessapi.entity.Workout;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

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
        this.workoutIdList = users.getWorkouts().stream().map(workout -> workout.getWorkoutId()).collect(Collectors.toSet());
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

    private Set<UUID> workoutIdList;
}
