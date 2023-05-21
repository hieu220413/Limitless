package fpt.edu.limitlessapi.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Collection;
import java.util.UUID;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Statistics {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name ="statistics_id")
    private UUID statisticId;

    private int burnedCalories;

    private int minutes;

    private LocalDate workoutDate;

    @ManyToMany(mappedBy = "statistics")
    Collection<Exercise> finishedExercises;

    @ManyToOne
    @JoinColumn(name = "users_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Users user;
}
