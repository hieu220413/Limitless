package fpt.edu.limitlessapi.repository;

import fpt.edu.limitlessapi.entity.Statistics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface StatisticsRepository extends JpaRepository<Statistics, UUID> {
}
