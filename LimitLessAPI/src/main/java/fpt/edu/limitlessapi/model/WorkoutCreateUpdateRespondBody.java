package fpt.edu.limitlessapi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fpt.edu.limitlessapi.entity.Exercise;
import fpt.edu.limitlessapi.entity.Level;
import fpt.edu.limitlessapi.entity.Workout;
import jakarta.persistence.*;
import lombok.*;

import java.util.Collection;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class WorkoutCreateUpdateRespondBody {

    public WorkoutCreateUpdateRespondBody(Workout workout) {
        this.workoutId = workout.getWorkoutId();
        this.thumbnail = workout.getThumbnail();
        this.name = workout.getName();
        this.description = workout.getDescription();
        this.totalExercise = workout.getTotalExercise();
        this.price = workout.getPrice();
        this.isPremium = workout.getIsPremium();
        this.status = workout.getStatus();
        this.level = new LevelResponseBody(workout.getLevel());
        this.exercises = workout.getExercises().stream().map(exercise -> new ExerciseCreateUpdateRespondBody(exercise)).collect(Collectors.toList());
    }

    private UUID workoutId;

    private String thumbnail;

    private String name;

    private String description;

    private int totalExercise;

    private int price;

    private byte isPremium;

    private int status;

    private LevelResponseBody level;

    private List<ExerciseCreateUpdateRespondBody> exercises;
}
