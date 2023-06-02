package fpt.edu.limitlessapi.repository;

import fpt.edu.limitlessapi.entity.Statistics;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface StatisticsRepository extends JpaRepository<Statistics, UUID> {

    @Query("SELECT stat FROM Statistics stat WHERE stat.user.userId = :userId AND stat.workoutDate = CURRENT_DATE")
    Optional<Statistics> findByUserIdToday(UUID userId);

    @Query("SELECT stat.workoutDate FROM Statistics stat WHERE stat.user.userId = :userId  ORDER BY stat.workoutDate ASC ")
    List<LocalDate> findOldestDate(UUID userId, Pageable pageable);

    @Query("SELECT stat FROM Statistics stat WHERE stat.user.userId = :userId AND stat.workoutDate = :date")
    Optional<Statistics> findByUserIdAndDate(UUID userId, LocalDate date);
}
