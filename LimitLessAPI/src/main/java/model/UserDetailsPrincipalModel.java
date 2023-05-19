package model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

@Builder
public class UserDetailsPrincipalModel {
    @JsonProperty("username")
    private String username = null;

    @JsonProperty("password")
    private String password = null;

//    @JsonProperty("role")
//    private User.RoleEnum role = null;

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

//    public User.RoleEnum getRole() {
//        return role;
//    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

//    public void setRole(User.RoleEnum role) {
//        this.role = role;
//    }
}
