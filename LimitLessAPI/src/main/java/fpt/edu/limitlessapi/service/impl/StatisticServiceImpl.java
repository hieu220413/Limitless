package fpt.edu.limitlessapi.service.impl;

import fpt.edu.limitlessapi.entity.Exercise;
import fpt.edu.limitlessapi.entity.Statistics;
import fpt.edu.limitlessapi.entity.Users;
import fpt.edu.limitlessapi.exception.ExerciseNotFoundException;
import fpt.edu.limitlessapi.exception.StatisticNotFoundException;
import fpt.edu.limitlessapi.exception.UserNotFoundException;
import fpt.edu.limitlessapi.repository.ExerciseRepository;
import fpt.edu.limitlessapi.repository.StatisticsRepository;
import fpt.edu.limitlessapi.repository.UserRepository;
import fpt.edu.limitlessapi.service.StatisticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StatisticServiceImpl implements StatisticService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ExerciseRepository exerciseRepository;
    @Autowired
    private StatisticsRepository statisticsRepository;


    @Override
    public void updateTodayStat(String userId, String exerciseId) throws ExerciseNotFoundException {
        Optional<Users> user = userRepository.findById(UUID.fromString(userId));
        Optional<Exercise> exercise = exerciseRepository.findById(UUID.fromString(exerciseId));
//        if(statistics != null && !statistics.isPresent()){
//            throw new StatisticNotFoundException("statistic not found");
//        }

        if(!user.isPresent()){
            throw new UserNotFoundException("NOT_FOUND");
        }

        if(!exercise.isPresent()){
            throw new ExerciseNotFoundException("exercise not found");
        }

        Optional<Statistics> statistics = statisticsRepository.findByUserIdToday(UUID.fromString(userId));

        if(statistics.isPresent()){
            int newStatMinutes = statistics.get().getMinutes() + exercise.get().getDuration();
            int newStatBurnCalories = statistics.get().getBurnedCalories() + exercise.get().getCaloriesBurn();
            statistics.get().setMinutes(newStatMinutes);
            statistics.get().setBurnedCalories(newStatBurnCalories);
            statistics.get().getFinishedExercises().add(exercise.get());
            statisticsRepository.save(statistics.get());
        }else{
            Statistics newStatistic = Statistics.builder()
                    .user(user.get())
                    .finishedExercises(List.of(exercise.get()))
                    .minutes(exercise.get().getDuration())
                    .burnedCalories(exercise.get().getCaloriesBurn())
                    .workoutDate(LocalDate.now())
                    .build();
            statisticsRepository.save(newStatistic);
        }

    }
}
