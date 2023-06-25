package fpt.edu.limitlessapi.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import fpt.edu.limitlessapi.meta.Status;
import fpt.edu.limitlessapi.model.ExerciseCreateRequestBody;
import jakarta.persistence.*;
import lombok.*;

import java.util.Collection;
import java.util.UUID;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Exercise {

    public Exercise(ExerciseCreateRequestBody exerciseCreateRequestBody, Level levelEntity) {
        this.thumbnail = exerciseCreateRequestBody.getThumbnail();
        this.description = exerciseCreateRequestBody.getDescription();
        this.name = exerciseCreateRequestBody.getName();
        this.video = exerciseCreateRequestBody.getVideo();
        this.viewCount = 0;
        this.sets = exerciseCreateRequestBody.getSets();
        this.reps = exerciseCreateRequestBody.getReps();
        this.duration = exerciseCreateRequestBody.getDuration();
        this.status = Status.ACTIVE;
        this.caloriesBurn = exerciseCreateRequestBody.getCaloriesBurn();
        this.level = levelEntity;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "exercise_id")
    private UUID exerciseId;

    private String thumbnail;

    private String description;

    private String name;

    private String video;

    private int viewCount;

    private int sets;

    private int reps;

    private int duration;

    @Enumerated(EnumType.ORDINAL)
    private Status status;

    private int caloriesBurn;


    @ManyToOne
    @JoinColumn(name = "level_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonIgnore
    private Level level;

    @ManyToMany
    @JoinTable(
            name = "exercise_workout",
            joinColumns = @JoinColumn(name = "exercise_id"),
            inverseJoinColumns = @JoinColumn(name = "workout_id"))
    @JsonIgnore
    Collection<Workout> workouts;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "exercise_tag",
            joinColumns = @JoinColumn(name = "exercise_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    Collection<Tag> tags;

    @ManyToMany
    @JoinTable(
            name = "exercise_statistics",
            joinColumns = @JoinColumn(name = "exercise_id"),
            inverseJoinColumns = @JoinColumn(name = "statistics_id"))
    @JsonIgnore
    Collection<Statistics> statistics;
}
