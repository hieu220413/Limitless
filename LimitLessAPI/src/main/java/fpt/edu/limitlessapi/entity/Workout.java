package fpt.edu.limitlessapi.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;

import java.util.Collection;
import java.util.UUID;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "workoutId")
public class Workout {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "workout_id")
    private UUID workoutId;

    private String thumbnail;

    private String name;

    private String description;

    private int totalExercise;

    private int status;

    @ManyToOne
    @JoinColumn(name = "level_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Level level;

    @ManyToMany(mappedBy = "workouts")
    Collection<Exercise> exercises;

    @ManyToMany(mappedBy = "workouts")
    Collection<Users> users;
}
