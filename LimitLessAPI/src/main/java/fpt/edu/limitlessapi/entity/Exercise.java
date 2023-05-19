package fpt.edu.limitlessapi.entity;

import fpt.edu.limitlessapi.meta.Status;
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

    private int duration;

    @Enumerated(EnumType.ORDINAL)
    private Status status;

    private int caloriesBurn;

    @ManyToOne
    @JoinColumn(name = "level_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Level level;

    @ManyToMany
    @JoinTable(
            name = "exercise_bundle",
            joinColumns = @JoinColumn(name = "exercise_id"),
            inverseJoinColumns = @JoinColumn(name = "bundle_id"))
    Collection<Bundle> bundles;

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
    Collection<Statistics> statistics;
}
