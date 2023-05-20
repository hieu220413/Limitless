package fpt.edu.limitlessapi.repository;

import fpt.edu.limitlessapi.entity.Level;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface LevelRepository extends JpaRepository<Level, UUID> {
    Level findByName(String name);
}
