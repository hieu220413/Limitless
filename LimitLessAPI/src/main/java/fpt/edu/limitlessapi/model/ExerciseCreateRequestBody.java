package fpt.edu.limitlessapi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fpt.edu.limitlessapi.entity.Level;
import fpt.edu.limitlessapi.meta.Status;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class ExerciseCreateRequestBody {
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
