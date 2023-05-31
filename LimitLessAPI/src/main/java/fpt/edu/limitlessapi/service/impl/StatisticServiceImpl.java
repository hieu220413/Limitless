package fpt.edu.limitlessapi.service.impl;

import fpt.edu.limitlessapi.entity.Exercise;
import fpt.edu.limitlessapi.entity.Statistics;
import fpt.edu.limitlessapi.entity.Users;
import fpt.edu.limitlessapi.exception.ExerciseNotFoundException;
import fpt.edu.limitlessapi.exception.StatisticNotFoundException;
import fpt.edu.limitlessapi.exception.UserNotFoundException;
import fpt.edu.limitlessapi.model.StatisticResponseBody;
import fpt.edu.limitlessapi.repository.ExerciseRepository;
import fpt.edu.limitlessapi.repository.StatisticsRepository;
import fpt.edu.limitlessapi.repository.UserRepository;
import fpt.edu.limitlessapi.service.StatisticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

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

    @Override
    public HashMap getStatisticByDate(String userId, LocalDate date) {
        Optional<Users> user = userRepository.findById(UUID.fromString(userId));

        if(!user.isPresent()){
            throw new UserNotFoundException("NOT_FOUND");
        }

        LocalDate oldestDate = LocalDate.now();
        List<LocalDate> oldestDateResult = statisticsRepository.findOldestDate(UUID.fromString(userId), PageRequest.of(0,1));
        if(oldestDateResult != null && !oldestDateResult.isEmpty()) {
            oldestDate = oldestDateResult.get(0);
        }

        StatisticResponseBody statisticResponseBody = null;
        if(statisticsRepository.findByUserIdAndDate(UUID.fromString(userId), date).isPresent()){
            statisticResponseBody = new StatisticResponseBody(statisticsRepository.findByUserIdAndDate(UUID.fromString(userId), date).get());
        }

        HashMap result = new HashMap();
        result.put("oldestDate", oldestDate);
        result.put("statisticResponseBody", statisticResponseBody);

        return result;
    }
}
