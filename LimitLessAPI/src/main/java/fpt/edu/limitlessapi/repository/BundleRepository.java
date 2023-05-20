package fpt.edu.limitlessapi.repository;

import fpt.edu.limitlessapi.entity.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BundleRepository extends JpaRepository<Workout, UUID> {

}
