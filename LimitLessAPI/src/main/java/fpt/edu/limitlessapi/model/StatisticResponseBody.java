package fpt.edu.limitlessapi.model;

import fpt.edu.limitlessapi.entity.Exercise;
import fpt.edu.limitlessapi.entity.Statistics;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;


@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class StatisticResponseBody {

    public StatisticResponseBody(Statistics statistics) {
        this.statisticId = statistics.getStatisticId();
        this.burnedCalories = statistics.getBurnedCalories();
        this.minutes = statistics.getMinutes();
        this.workoutDate = statistics.getWorkoutDate();
        this.finishedExercises = statistics.getFinishedExercises().stream().toList();
    }

    private UUID statisticId;

    private int burnedCalories;

    private int minutes;

    private LocalDate workoutDate;

    List<Exercise> finishedExercises;
}
