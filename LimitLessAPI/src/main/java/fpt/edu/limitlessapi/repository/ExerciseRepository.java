package fpt.edu.limitlessapi.repository;

import fpt.edu.limitlessapi.entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.UUID;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, UUID> {

    Collection<Exercise> findByNameContains(String name);
}
