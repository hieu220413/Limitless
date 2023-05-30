package fpt.edu.limitlessapi.repository;

import fpt.edu.limitlessapi.entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, UUID> {

    @Query("SELECT ex FROM Exercise ex WHERE ex.level.name = :level AND ex.name LIKE %:name%")
    Collection<Exercise> findByNameLAndLevel(@Param("name") String name,@Param("level") String level);

    @Query("SELECT ex FROM Exercise ex ")
    List<Exercise> findAll();
}
