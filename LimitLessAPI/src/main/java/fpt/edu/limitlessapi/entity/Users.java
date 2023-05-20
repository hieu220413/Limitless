package fpt.edu.limitlessapi.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.util.Collection;
import java.util.UUID;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_id")
    private UUID userId;

    private String username;

    private String password;

    private String email;

    private String fullName;

    private String phone;

    private Date doB;

    private int age;

    private int weight;

    private int height;

    private int gender;

    private int status;

    @ManyToMany
    @JoinTable(
            name = "user_workout",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "workout_id"))
    Collection<Workout> workouts;

    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.ALL
    )
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Collection<Statistics> statisticsWithDates;

    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.ALL
    )
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Collection<Subscription> subscriptions;
}
