package fpt.edu.limitlessapi.model;

import fpt.edu.limitlessapi.entity.Users;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.Range;
import org.springframework.validation.annotation.Validated;

import java.sql.Date;
import java.util.UUID;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
@Validated
public class UserAdditionalDetailRequestBody {
//    public UserAdditionalDetailRequestBody(Users users) {
//        this.userId = users.getUserId();
//        this.fullName = users.getFullName();
//        this.age = users.getAge();
//        this.weight = users.getWeight();
//        this.height = users.getHeight();
//        this.gender = users.getGender();
//    }

    @NotNull
    @Length(min = 2, max = 50 , message = "name length min is 2 and max is 50")
    private String fullName;

    @NotNull
    @Range(min = 10, max = 80, message = "age is in range 10 to 80")
    private int age;

    @NotNull
    @Range(min = 30, max = 200, message = "weight is in range 30kg to 200kg")
    private int weight;

    @NotNull
    private String level;

    @NotNull
    @Range(min = 130, max = 190, message = "height is in range 130cm to 190cm")
    private int height;

    @NotNull
    @Range(min = 0, max = 1, message = "male is 0, female is 1")
    private int gender;
}
