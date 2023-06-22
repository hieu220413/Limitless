package fpt.edu.limitlessapi.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class ExerciseUpdateRequestBody {
    private UUID exerciseId;

    private String thumbnail;

    private String description;

    private String name;

    private String video;

    private int sets;

    private int reps;

    private int duration;

    private int caloriesBurn;

    private UUID levelId;
}
