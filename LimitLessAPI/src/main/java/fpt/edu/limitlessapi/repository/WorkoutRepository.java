package fpt.edu.limitlessapi.repository;

import fpt.edu.limitlessapi.entity.Exercise;
import fpt.edu.limitlessapi.entity.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.UUID;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, UUID> {

    @Query("SELECT wk FROM Workout wk WHERE wk.level.name = :level AND wk.name LIKE %:name%")
    Collection<Workout> findByNameLAndLevel(@Param("name") String name, @Param("level") String level);
}
