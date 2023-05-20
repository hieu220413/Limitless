package fpt.edu.limitlessapi.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Collection;
import java.util.UUID;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Level {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "level_id")
    private UUID levelId;

    private String name;

    @OneToMany(
            mappedBy = "level",
            cascade = CascadeType.ALL
    )
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Collection<Exercise> exercises;

    @OneToMany(
            mappedBy = "level",
            cascade = CascadeType.ALL
    )
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Collection<Workout> workouts;

}
