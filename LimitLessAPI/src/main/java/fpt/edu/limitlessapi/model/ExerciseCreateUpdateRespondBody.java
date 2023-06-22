package fpt.edu.limitlessapi.model;

import fpt.edu.limitlessapi.entity.Exercise;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class ExerciseCreateUpdateRespondBody {


    public ExerciseCreateUpdateRespondBody(Exercise exercise) {
        this.exerciseId = exercise.getExerciseId();
        this.thumbnail = exercise.getThumbnail();
        this.description = exercise.getDescription();
        this.name = exercise.getName();
        this.video = exercise.getVideo();
        this.viewCount = exercise.getViewCount();
        this.sets = exercise.getSets();
        this.reps = exercise.getReps();
        this.duration = exercise.getDuration();
        this.status = exercise.getStatus().ordinal();
        this.caloriesBurn = exercise.getCaloriesBurn();
        this.level = new LevelResponseBody(exercise.getLevel());
    }

    private UUID exerciseId;

    private String thumbnail;

    private String description;

    private String name;

    private String video;

    private int viewCount;

    private int sets;

    private int reps;

    private int duration;

    private int status;

    private int caloriesBurn;

    private LevelResponseBody level;
}
