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
public class Bundle {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "bundle_id")
    private UUID bundleId;

    private String thumbnail;

    private String name;

    private String description;

    private int totalExercise;

    private int status;

    @ManyToOne
    @JoinColumn(name = "level_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Level level;

    @ManyToMany(mappedBy = "bundles")
    Collection<Exercise> exercises;

    @ManyToMany(mappedBy = "bundles")
    Collection<Users> users;
}
