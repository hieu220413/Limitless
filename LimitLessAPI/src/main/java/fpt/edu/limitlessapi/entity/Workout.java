package fpt.edu.limitlessapi.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import fpt.edu.limitlessapi.meta.Status;
import fpt.edu.limitlessapi.model.WorkoutCreateRequestBody;
import jakarta.persistence.*;
import lombok.*;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Workout {
    public Workout(WorkoutCreateRequestBody workoutCreateRequestBody, List<Exercise> exerciseList, Level levelEntity) {
        this.thumbnail = workoutCreateRequestBody.getThumbnail();
        this.name = workoutCreateRequestBody.getName();
        this.description = workoutCreateRequestBody.getDescription();
        this.totalExercise = exerciseList.size();
        this.price = workoutCreateRequestBody.getPrice();
        this.isPremium =  workoutCreateRequestBody.getIsPremium();
        this.status = Status.ACTIVE.ordinal();
        this.level = levelEntity;
        this.exercises = exerciseList;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "workout_id")
    private UUID workoutId;

    private String thumbnail;

    private String name;

    private String description;

    private int totalExercise;

    private int price;

    private byte isPremium;


    private int status;

    @ManyToOne
    @JoinColumn(name = "level_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonIgnore
    private Level level;

    @ManyToMany(mappedBy = "workouts")
    Collection<Exercise> exercises;

    @ManyToMany(mappedBy = "workouts")
    @JsonIgnore
    Collection<Users> users;
}
