-- User records
INSERT INTO `limitless`.`users` (`user_id`, `age`, `dob`, `email`, `full_name`, `gender`, `height`, `level`, `password`, `phone`, `status`, `username`, `weight`) VALUES (UUID_TO_BIN('4e7960aa-f7dd-11ed-bcc5-a85e45c41921'),'20', '2002-06-24', 'luugiavinh@gmail.com', 'Luu Gia Vinh', '0', '170', 'Beginner', '$2a$12$l1CSdOoXhSEPrT98j9Xj.ejDg9EdyweFuBKwnbEK4U72ZVWY4UoLO', '0903647536', '2', 'luugiavinh', '60');
INSERT INTO `limitless`.`users` (`user_id`, `age`, `dob`, `email`, `full_name`, `gender`, `height`, `level`, `password`, `phone`, `status`, `username`, `weight`) VALUES (UUID_TO_BIN('4e797140-f7dd-11ed-bcc5-a85e45c41921'),'20', '2002-03-15', 'nguyentrunghieu@gmail.com', 'Nguyen Trung Hieu', '0', '170', 'Beginner', '$2a$12$B7KedHg8Nr0uzVW3HSJ93uHNQBQ2qKvfH4X.4u4hAPN5kl.309qEG', '0908574625', '2', 'nguyentrunghieu', '60');
INSERT INTO `limitless`.`users` (`user_id`, `age`, `dob`, `email`, `full_name`, `gender`, `height`, `level`, `password`, `phone`, `status`, `username`, `weight`) VALUES (UUID_TO_BIN('4e797fdf-f7dd-11ed-bcc5-a85e45c41921'),'20', '2002-04-25', 'phamhongquang@gmail.com', 'Pham Hong Quang', '0', '170', 'Intermediate', '$2a$12$88DDmVQOdlrxfBdLq3NR1eNCdin19Emt852uS17GleE2zcBi6v7kC', '0903645231', '2', 'phamhongquang', '60');
INSERT INTO `limitless`.`users` (`user_id`, `age`, `dob`, `email`, `full_name`, `gender`, `height`, `level`, `password`, `phone`, `status`, `username`, `weight`) VALUES (UUID_TO_BIN('4e79ac7f-f7dd-11ed-bcc5-a85e45c41921'),'20', '2002-03-13', 'danghoanganhkhoa@gmail.com', 'Dang Hoang Anh Khoa', '0', '170', 'Advanced', '$2a$12$o3AAWSFAiDuA4i6JWJa//.yH4UIWty8VqcZppOEbYEI4R1vs.modG', '0905757463', '2', 'danghoanganhkhoa', '60');
INSERT INTO `limitless`.`users` (`user_id`, `age`, `dob`, `email`, `full_name`, `gender`, `height`, `level`, `password`, `phone`, `status`, `username`, `weight`) VALUES (UUID_TO_BIN('4e79b77b-f7dd-11ed-bcc5-a85e45c41921'),'20', '2002-07-21', 'dangnguyenhiep@gmail.com', 'Dang Nguyen Hiep', '0', '170', 'Intermediate', '$2a$12$.F5FMOgYQA3e4E3YmkE8yeYw0dNVgSAgIdsx.V8oH6Z.QGYi7VuiC', '0907878342', '2', 'dangnguyenhiep', '60');
INSERT INTO `limitless`.`users` (`user_id`, `age`, `dob`, `email`, `full_name`, `gender`, `height`, `level`, `password`, `phone`, `status`, `username`, `weight`) VALUES (UUID_TO_BIN('4e79c727-f7dd-11ed-bcc5-a85e45c41921'),'20', '2002-07-27', 'nguyendaiduong@gmail.com', 'Nguyen Dai Duong', '0', '170', 'Advanced','$2a$12$xiVnWoKE5hw1nc9CHUuMd.JsdxSe.REp.8T7UinSyiKdzM2pvJJdW', '0904635263', '2', 'nguyendaiduong', '60');

-- Subscription records
INSERT INTO `limitless`.`subscription` (`subscription_id`, `end_date`, `price`, `start_date`, `users_id`) VALUES (UUID_TO_BIN('e5bf41fc-0cf2-43f8-a244-21105bd693f9'), '2023-07-06 10:21:00.000000', '200000', '2023-06-06 10:21:00.000000', UUID_TO_BIN('4e7960aa-f7dd-11ed-bcc5-a85e45c41921'));


-- level records
INSERT INTO `limitless`.`level` (`level_id`, `name`) VALUES (UUID_TO_BIN('fd76b59a-f7de-11ed-bcc5-a85e45c41921'),'Beginner');
INSERT INTO `limitless`.`level` (`level_id`, `name`) VALUES (UUID_TO_BIN('fd76ced1-f7de-11ed-bcc5-a85e45c41921'),'Intermediate');
INSERT INTO `limitless`.`level` (`level_id`, `name`) VALUES (UUID_TO_BIN('fd770718-f7de-11ed-bcc5-a85e45c41921'),'Advanced');



-- exe record
INSERT INTO `limitless`.`exercise` (`exercise_id`, `calories_burn`, `description`, `duration`, `name`, `sets`, `reps`, `status`, `thumbnail`, `video`, `view_count`, `level_id`) VALUES (UUID_TO_BIN('80b2b659-f7e7-11ed-bcc5-a85e45c41921'),'400', 'Collaborative exercise that works chest, shoulders, back arms', '8', 'Bench Press', '2', '10', '0', 'bench-press.jpg', 'bench-press.mp4', '0',UUID_TO_BIN('fd76b59a-f7de-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise` (`exercise_id`, `calories_burn`, `description`, `duration`, `name`, `sets`, `reps`, `status`, `thumbnail`, `video`, `view_count`, `level_id`) VALUES (UUID_TO_BIN('80b2ddc0-f7e7-11ed-bcc5-a85e45c41921'),'400', 'Isolation exercises that work the chest, shoulders, back arms', '8', 'Dumbbell Inclined Bench Press', '2', '10', '0', 'db-press.jpg', 'inclined-dumbell-press.mp4', '0',UUID_TO_BIN('fd76ced1-f7de-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise` (`exercise_id`, `calories_burn`, `description`, `duration`, `name`, `sets`, `reps`, `status`, `thumbnail`, `video`, `view_count`, `level_id`) VALUES (UUID_TO_BIN('80b2fc49-f7e7-11ed-bcc5-a85e45c41921'),'410', 'Isolation exercises impact chest, shoulders', '8', 'Chest Fly', '2', '10', '0', 'push-workout.jpg', 'chest-fly.mp4', '0',UUID_TO_BIN('fd770718-f7de-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise` (`exercise_id`, `calories_burn`, `description`, `duration`, `name`, `sets`, `reps`, `status`, `thumbnail`, `video`, `view_count`, `level_id`) VALUES (UUID_TO_BIN('80b30c36-f7e7-11ed-bcc5-a85e45c41921'),'390', 'Isolation exercises for the back arm', '8', ' Inclined Barbell Close Grip Bench Press', '2', '10', '0', 'close-grip-bench-press.jpg', 'inclined-barbell-close-grip-bench-press.mp4', '0',UUID_TO_BIN('fd76b59a-f7de-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise` (`exercise_id`, `calories_burn`, `description`, `duration`, `name`, `sets`, `reps`, `status`, `thumbnail`, `video`, `view_count`, `level_id`) VALUES (UUID_TO_BIN('80b325fe-f7e7-11ed-bcc5-a85e45c41921'),'420', 'Isolation exercises for the back arm', '10', 'Triceps Extension', '3', '10', '0', 'triceps-extension.jpg', 'triceps-extension.mp4', '0',UUID_TO_BIN('fd76ced1-f7de-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise` (`exercise_id`, `calories_burn`, `description`, `duration`, `name`, `sets`, `reps`, `status`, `thumbnail`, `video`, `view_count`, `level_id`) VALUES (UUID_TO_BIN('80b33b45-f7e7-11ed-bcc5-a85e45c41921'),'430', 'Compound exercises impacting the back, lats, biceps', '10', 'Barbell Rows', '3', '10', '0', 'barbell-rows.jpg', 'barbell-rows.mp4', '0',UUID_TO_BIN('fd770718-f7de-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise` (`exercise_id`, `calories_burn`, `description`, `duration`, `name`, `sets`, `reps`, `status`, `thumbnail`, `video`, `view_count`, `level_id`) VALUES (UUID_TO_BIN('abfebb9c-f7e9-11ed-bcc5-a85e45c41921'), '400', 'Compound exercises impacting the back, lats, forearm', '8', 'Lat Pulldown', '2', '10', '0', 'lat-pulldown.jpg', 'lat-pulldown.mp4', '0', UUID_TO_BIN('fd76b59a-f7de-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise` (`exercise_id`, `calories_burn`, `description`, `duration`, `name`, `sets`, `reps`, `status`, `thumbnail`, `video`, `view_count`, `level_id`) VALUES (UUID_TO_BIN('abfed15f-f7e9-11ed-bcc5-a85e45c41921'), '420', 'Isolation exercises impact lats, forearm', '9', 'One-arm Lat Pulldown', '3', '10', '0', 'thumnail', 'one-arm-lat-pulldown.mp4', '0', UUID_TO_BIN('fd770718-f7de-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise` (`exercise_id`, `calories_burn`, `description`, `duration`, `name`, `sets`, `reps`, `status`, `thumbnail`, `video`, `view_count`, `level_id`) VALUES (UUID_TO_BIN('abfee7cb-f7e9-11ed-bcc5-a85e45c41921'), '430', 'Isolation exercise for the biceps', '9', 'Barbell Curl', '3', '10', '0', 'barbell-curl.jpg', 'barbell-curl.mp4', '0', UUID_TO_BIN('fd770718-f7de-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise` (`exercise_id`, `calories_burn`, `description`, `duration`, `name`, `sets`, `reps`, `status`, `thumbnail`, `video`, `view_count`, `level_id`) VALUES (UUID_TO_BIN('abfef97b-f7e9-11ed-bcc5-a85e45c41921'), '410', 'Isolation exercise for biceps, forearm', '8', 'Hammer Curl', '2', '10', '0', 'hammer-curl.jpg', 'hammer-curl.mp4', '0', UUID_TO_BIN('fd76b59a-f7de-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise` (`exercise_id`, `calories_burn`, `description`, `duration`, `name`, `sets`, `reps`, `status`, `thumbnail`, `video`, `view_count`, `level_id`) VALUES (UUID_TO_BIN('abff0bae-f7e9-11ed-bcc5-a85e45c41921'), '430', 'Compound exercises impact the front thighs, buttocks', '10', 'Squat', '3', '10', '0', 'squat.jpg', 'squat.mp4', '0', UUID_TO_BIN('fd770718-f7de-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise` (`exercise_id`, `calories_burn`, `description`, `duration`, `name`, `sets`, `reps`, `status`, `thumbnail`, `video`, `view_count`, `level_id`) VALUES (UUID_TO_BIN('abff1ad7-f7e9-11ed-bcc5-a85e45c41921'), '430', 'Compound exercises that work the front thighs, buttocks, and back thighs', '9', 'Leg Press', '3', '10', '0', 'leg-press.jpg', 'leg-press.mp4', '0', UUID_TO_BIN('fd76ced1-f7de-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise` (`exercise_id`, `calories_burn`, `description`, `duration`, `name`, `sets`, `reps`, `status`, `thumbnail`, `video`, `view_count`, `level_id`) VALUES (UUID_TO_BIN('abff28d8-f7e9-11ed-bcc5-a85e45c41921'), '410', 'Isolation exercises that work the front thighs', '8', 'Leg Extension', '2', '10', '0', 'leg-extension.jpg', 'leg-extension.mp4', '0', UUID_TO_BIN('fd76b59a-f7de-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise` (`exercise_id`, `calories_burn`, `description`, `duration`, `name`, `sets`, `reps`, `status`, `thumbnail`, `video`, `view_count`, `level_id`) VALUES (UUID_TO_BIN('abff35cc-f7e9-11ed-bcc5-a85e45c41921'), '400', 'Isolation exercises that work the hamstrings', '8', 'Leg Curl', '2', '10', '0', 'leg-curl.jpg', 'leg-curl.mp4', '0', UUID_TO_BIN('fd76b59a-f7de-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise` (`exercise_id`, `calories_burn`, `description`, `duration`, `name`, `sets`, `reps`, `status`, `thumbnail`, `video`, `view_count`, `level_id`) VALUES (UUID_TO_BIN('abff4036-f7e9-11ed-bcc5-a85e45c41921'), '420', 'Isolation exercises for calves', '9', 'Calves Raise', '3', '10', '0', 'calves-raise.jpg', 'calves-raise.mp4', '0', UUID_TO_BIN('fd76ced1-f7de-11ed-bcc5-a85e45c41921'));



-- tag records
INSERT INTO `limitless`.`tag` (`tag_id`, `name`) VALUES (UUID_TO_BIN('28bacfd1-f7eb-11ed-bcc5-a85e45c41921'), 'tag1');
INSERT INTO `limitless`.`tag` (`tag_id`, `name`) VALUES (UUID_TO_BIN('28bae76f-f7eb-11ed-bcc5-a85e45c41921'), 'tag2');
INSERT INTO `limitless`.`tag` (`tag_id`, `name`) VALUES (UUID_TO_BIN('28baf801-f7eb-11ed-bcc5-a85e45c41921'), 'tag3');
INSERT INTO `limitless`.`tag` (`tag_id`, `name`) VALUES (UUID_TO_BIN('28bb0627-f7eb-11ed-bcc5-a85e45c41921'), 'tag4');
INSERT INTO `limitless`.`tag` (`tag_id`, `name`) VALUES (UUID_TO_BIN('28bb3527-f7eb-11ed-bcc5-a85e45c41921'), 'tag5');



-- workout records ( 0 is premium, 1 is free)
INSERT INTO `limitless`.`workout` (`workout_id`, `description`, `is_premium`, `price`, `name`, `status`, `thumbnail`, `total_exercise`, `level_id`) VALUES (UUID_TO_BIN('c186c33d-f7ec-11ed-bcc5-a85e45c41921'), 'Focus on lower part of body', '0', '60000', 'Lower Body Workout', '0', 'squat.jpg', '5', UUID_TO_BIN('fd76ced1-f7de-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`workout` (`workout_id`, `description`, `is_premium`, `price`, `name`, `status`, `thumbnail`, `total_exercise`, `level_id`) VALUES (UUID_TO_BIN('c186e4db-f7ec-11ed-bcc5-a85e45c41921'), 'Focus on uppder part of body', '0', '60000', 'Upper Body Workout', '0', 'bench-press.jpg', '5', UUID_TO_BIN('fd76ced1-f7de-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`workout` (`workout_id`, `description`, `is_premium`, `price`, `name`, `status`, `thumbnail`, `total_exercise`, `level_id`) VALUES (UUID_TO_BIN('c186fdaf-f7ec-11ed-bcc5-a85e45c41921'), 'Focus on back and arm', '0', '60000', 'Back + Arm Workout', '0', 'barbell-rows.jpg', '5', UUID_TO_BIN('fd76b59a-f7de-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`workout` (`workout_id`, `description`, `is_premium`, `price`, `name`, `status`, `thumbnail`, `total_exercise`, `level_id`) VALUES (UUID_TO_BIN('c1870d98-f7ec-11ed-bcc5-a85e45c41921'), 'Focus on leg and chest', '0', '60000', 'Leg + Chest Workout', '0', 'db-press.jpg', '5', UUID_TO_BIN('fd770718-f7de-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`workout` (`workout_id`, `description`, `is_premium`, `price`, `name`, `status`, `thumbnail`, `total_exercise`, `level_id`) VALUES (UUID_TO_BIN('c1871b11-f7ec-11ed-bcc5-a85e45c41921'), 'Focus on back arm', '1', '0', 'Back Arm Workout', '0', 'close-grip-bench-press.jpg', '3', UUID_TO_BIN('fd76b59a-f7de-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`workout` (`workout_id`, `description`, `is_premium`, `price`, `name`, `status`, `thumbnail`, `total_exercise`, `level_id`) VALUES (UUID_TO_BIN('c18726e6-f7ec-11ed-bcc5-a85e45c41921'), 'Focus on biceps', '1', '0', 'Biceps Workout', '0', 'hammer-curl.jpg', '3', UUID_TO_BIN('fd76ced1-f7de-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`workout` (`workout_id`, `description`, `is_premium`, `price`, `name`, `status`, `thumbnail`, `total_exercise`, `level_id`) VALUES (UUID_TO_BIN('c1873571-f7ec-11ed-bcc5-a85e45c41921'), 'Focus on front thigh', '1', '0', 'Front Thigh Workout', '0', 'leg-press.jpg', '3', UUID_TO_BIN('fd770718-f7de-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`workout` (`workout_id`, `description`, `is_premium`, `price`, `name`, `status`, `thumbnail`, `total_exercise`, `level_id`) VALUES (UUID_TO_BIN('c18745aa-f7ec-11ed-bcc5-a85e45c41921'), 'Focus on forearm', '1', '0', 'Forearm Workout', '0', 'lat-pulldown.jpg', '3', UUID_TO_BIN('fd770718-f7de-11ed-bcc5-a85e45c41921'));

--addmore eassy (delete cmt later)
INSERT INTO `limitless`.`workout` (`workout_id`, `description`, `is_premium`, `price`, `name`, `status`, `thumbnail`, `total_exercise`, `level_id`) VALUES (UUID_TO_BIN('b8f84835-036d-11ee-bc40-0e9bf7f9a15b'), 'Focus on shoulder', '1', '0', 'Shoulder Workout', '0', 'push-workout.jpg', '3', UUID_TO_BIN('fd76b59a-f7de-11ed-bcc5-a85e45c41921'));




-- statistic records
INSERT INTO `limitless`.`statistics` (`statistics_id`, `burned_calories`, `minutes`, `workout_date`, `users_id`) VALUES (UUID_TO_BIN('23c0198f-f7ef-11ed-bcc5-a85e45c41921'), '1000', '50', '2023-05-21', UUID_TO_BIN('4e7960aa-f7dd-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`statistics` (`statistics_id`, `burned_calories`, `minutes`, `workout_date`, `users_id`) VALUES (UUID_TO_BIN('23c02fb2-f7ef-11ed-bcc5-a85e45c41921'), '800', '40', '2023-05-20', UUID_TO_BIN('4e7960aa-f7dd-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`statistics` (`statistics_id`, `burned_calories`, `minutes`, `workout_date`, `users_id`) VALUES (UUID_TO_BIN('23c03ec8-f7ef-11ed-bcc5-a85e45c41921'), '600', '30', '2023-05-19', UUID_TO_BIN('4e7960aa-f7dd-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`statistics` (`statistics_id`, `burned_calories`, `minutes`, `workout_date`, `users_id`) VALUES (UUID_TO_BIN('23c05132-f7ef-11ed-bcc5-a85e45c41921'), '850', '45', '2023-05-18', UUID_TO_BIN('4e7960aa-f7dd-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`statistics` (`statistics_id`, `burned_calories`, `minutes`, `workout_date`, `users_id`) VALUES (UUID_TO_BIN('23c0604f-f7ef-11ed-bcc5-a85e45c41921'), '1100', '55', '2023-05-17', UUID_TO_BIN('4e7960aa-f7dd-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`statistics` (`statistics_id`, `burned_calories`, `minutes`, `workout_date`, `users_id`) VALUES (UUID_TO_BIN('23c07053-f7ef-11ed-bcc5-a85e45c41921'), '750', '40', '2023-05-21', UUID_TO_BIN('4e797140-f7dd-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`statistics` (`statistics_id`, `burned_calories`, `minutes`, `workout_date`, `users_id`) VALUES (UUID_TO_BIN('23c08110-f7ef-11ed-bcc5-a85e45c41921'), '900', '45', '2023-05-20', UUID_TO_BIN('4e797140-f7dd-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`statistics` (`statistics_id`, `burned_calories`, `minutes`, `workout_date`, `users_id`) VALUES (UUID_TO_BIN('23c08e1c-f7ef-11ed-bcc5-a85e45c41921'), '950', '50', '2023-05-19', UUID_TO_BIN('4e797140-f7dd-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`statistics` (`statistics_id`, `burned_calories`, `minutes`, `workout_date`, `users_id`) VALUES (UUID_TO_BIN('23c09978-f7ef-11ed-bcc5-a85e45c41921'), '1100', '55', '2023-05-18', UUID_TO_BIN('4e797140-f7dd-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`statistics` (`statistics_id`, `burned_calories`, `minutes`, `workout_date`, `users_id`) VALUES (UUID_TO_BIN('23c0a3dd-f7ef-11ed-bcc5-a85e45c41921'), '1300', '60', '2023-05-17', UUID_TO_BIN('4e797140-f7dd-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`statistics` (`statistics_id`, `burned_calories`, `minutes`, `workout_date`, `users_id`) VALUES (UUID_TO_BIN('23c0aec7-f7ef-11ed-bcc5-a85e45c41921'), '700', '35', '2023-05-21', UUID_TO_BIN('4e797fdf-f7dd-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`statistics` (`statistics_id`, `burned_calories`, `minutes`, `workout_date`, `users_id`) VALUES (UUID_TO_BIN('23c0b822-f7ef-11ed-bcc5-a85e45c41921'), '650', '30', '2023-05-20', UUID_TO_BIN('4e797fdf-f7dd-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`statistics` (`statistics_id`, `burned_calories`, `minutes`, `workout_date`, `users_id`) VALUES (UUID_TO_BIN('23c0c0c2-f7ef-11ed-bcc5-a85e45c41921'), '1050', '50', '2023-05-19', UUID_TO_BIN('4e797fdf-f7dd-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`statistics` (`statistics_id`, `burned_calories`, `minutes`, `workout_date`, `users_id`) VALUES (UUID_TO_BIN('23c0c91f-f7ef-11ed-bcc5-a85e45c41921'), '1350', '60', '2023-05-18', UUID_TO_BIN('4e797fdf-f7dd-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`statistics` (`statistics_id`, `burned_calories`, `minutes`, `workout_date`, `users_id`) VALUES (UUID_TO_BIN('23c0d27d-f7ef-11ed-bcc5-a85e45c41921'), '1000', '55', '2023-05-17', UUID_TO_BIN('4e797fdf-f7dd-11ed-bcc5-a85e45c41921'));



-- exercise_statistics (only statistics (2023-05-21) have data)
INSERT INTO `limitless`.`exercise_statistics` (`exercise_id`, `statistics_id`) VALUES (UUID_TO_BIN('80b2b659-f7e7-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('23c0198f-f7ef-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise_statistics` (`exercise_id`, `statistics_id`) VALUES (UUID_TO_BIN('80b2ddc0-f7e7-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('23c0198f-f7ef-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise_statistics` (`exercise_id`, `statistics_id`) VALUES (UUID_TO_BIN('80b2fc49-f7e7-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('23c0198f-f7ef-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise_statistics` (`exercise_id`, `statistics_id`) VALUES (UUID_TO_BIN('80b30c36-f7e7-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('23c0198f-f7ef-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise_statistics` (`exercise_id`, `statistics_id`) VALUES (UUID_TO_BIN('80b325fe-f7e7-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('23c0198f-f7ef-11ed-bcc5-a85e45c41921'));

INSERT INTO `limitless`.`exercise_statistics` (`exercise_id`, `statistics_id`) VALUES (UUID_TO_BIN('80b2b659-f7e7-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('23c07053-f7ef-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise_statistics` (`exercise_id`, `statistics_id`) VALUES (UUID_TO_BIN('80b2ddc0-f7e7-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('23c07053-f7ef-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise_statistics` (`exercise_id`, `statistics_id`) VALUES (UUID_TO_BIN('80b2fc49-f7e7-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('23c07053-f7ef-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise_statistics` (`exercise_id`, `statistics_id`) VALUES (UUID_TO_BIN('80b30c36-f7e7-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('23c07053-f7ef-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise_statistics` (`exercise_id`, `statistics_id`) VALUES (UUID_TO_BIN('80b325fe-f7e7-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('23c07053-f7ef-11ed-bcc5-a85e45c41921'));

INSERT INTO `limitless`.`exercise_statistics` (`exercise_id`, `statistics_id`) VALUES (UUID_TO_BIN('80b2b659-f7e7-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('23c0aec7-f7ef-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise_statistics` (`exercise_id`, `statistics_id`) VALUES (UUID_TO_BIN('80b2ddc0-f7e7-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('23c0aec7-f7ef-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise_statistics` (`exercise_id`, `statistics_id`) VALUES (UUID_TO_BIN('80b2fc49-f7e7-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('23c0aec7-f7ef-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise_statistics` (`exercise_id`, `statistics_id`) VALUES (UUID_TO_BIN('80b30c36-f7e7-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('23c0aec7-f7ef-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise_statistics` (`exercise_id`, `statistics_id`) VALUES (UUID_TO_BIN('80b325fe-f7e7-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('23c0aec7-f7ef-11ed-bcc5-a85e45c41921'));



-- exercise_workout
INSERT INTO `limitless`.`exercise_workout` (`exercise_id`, `workout_id`) VALUES (UUID_TO_BIN('abff0bae-f7e9-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('c186c33d-f7ec-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise_workout` (`exercise_id`, `workout_id`) VALUES (UUID_TO_BIN('abff1ad7-f7e9-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('c186c33d-f7ec-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise_workout` (`exercise_id`, `workout_id`) VALUES (UUID_TO_BIN('abff28d8-f7e9-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('c186c33d-f7ec-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise_workout` (`exercise_id`, `workout_id`) VALUES (UUID_TO_BIN('abff35cc-f7e9-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('c186c33d-f7ec-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise_workout` (`exercise_id`, `workout_id`) VALUES (UUID_TO_BIN('abff4036-f7e9-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('c186c33d-f7ec-11ed-bcc5-a85e45c41921'));

INSERT INTO `limitless`.`exercise_workout` (`exercise_id`, `workout_id`) VALUES (UUID_TO_BIN('80b2b659-f7e7-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('c186e4db-f7ec-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise_workout` (`exercise_id`, `workout_id`) VALUES (UUID_TO_BIN('80b2ddc0-f7e7-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('c186e4db-f7ec-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise_workout` (`exercise_id`, `workout_id`) VALUES (UUID_TO_BIN('80b2fc49-f7e7-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('c186e4db-f7ec-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise_workout` (`exercise_id`, `workout_id`) VALUES (UUID_TO_BIN('80b30c36-f7e7-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('c186e4db-f7ec-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise_workout` (`exercise_id`, `workout_id`) VALUES (UUID_TO_BIN('80b325fe-f7e7-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('c186e4db-f7ec-11ed-bcc5-a85e45c41921'));

INSERT INTO `limitless`.`exercise_workout` (`exercise_id`, `workout_id`) VALUES (UUID_TO_BIN('80b33b45-f7e7-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('c186fdaf-f7ec-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise_workout` (`exercise_id`, `workout_id`) VALUES (UUID_TO_BIN('abfebb9c-f7e9-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('c186fdaf-f7ec-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise_workout` (`exercise_id`, `workout_id`) VALUES (UUID_TO_BIN('abfed15f-f7e9-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('c186fdaf-f7ec-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise_workout` (`exercise_id`, `workout_id`) VALUES (UUID_TO_BIN('abfef97b-f7e9-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('c186fdaf-f7ec-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise_workout` (`exercise_id`, `workout_id`) VALUES (UUID_TO_BIN('abfee7cb-f7e9-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('c186fdaf-f7ec-11ed-bcc5-a85e45c41921'));

INSERT INTO `limitless`.`exercise_workout` (`exercise_id`, `workout_id`) VALUES (UUID_TO_BIN('80b2b659-f7e7-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('c1870d98-f7ec-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise_workout` (`exercise_id`, `workout_id`) VALUES (UUID_TO_BIN('80b2ddc0-f7e7-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('c1870d98-f7ec-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise_workout` (`exercise_id`, `workout_id`) VALUES (UUID_TO_BIN('80b2fc49-f7e7-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('c1870d98-f7ec-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise_workout` (`exercise_id`, `workout_id`) VALUES (UUID_TO_BIN('abff0bae-f7e9-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('c1870d98-f7ec-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise_workout` (`exercise_id`, `workout_id`) VALUES (UUID_TO_BIN('abff28d8-f7e9-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('c1870d98-f7ec-11ed-bcc5-a85e45c41921'));

INSERT INTO `limitless`.`exercise_workout` (`exercise_id`, `workout_id`) VALUES (UUID_TO_BIN('80b30c36-f7e7-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('c1871b11-f7ec-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise_workout` (`exercise_id`, `workout_id`) VALUES (UUID_TO_BIN('80b325fe-f7e7-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('c1871b11-f7ec-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise_workout` (`exercise_id`, `workout_id`) VALUES (UUID_TO_BIN('80b2ddc0-f7e7-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('c1871b11-f7ec-11ed-bcc5-a85e45c41921'));


INSERT INTO `limitless`.`exercise_workout` (`exercise_id`, `workout_id`) VALUES (UUID_TO_BIN('abfee7cb-f7e9-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('c18726e6-f7ec-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise_workout` (`exercise_id`, `workout_id`) VALUES (UUID_TO_BIN('abfef97b-f7e9-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('c18726e6-f7ec-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise_workout` (`exercise_id`, `workout_id`) VALUES (UUID_TO_BIN('80b33b45-f7e7-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('c18726e6-f7ec-11ed-bcc5-a85e45c41921'));

INSERT INTO `limitless`.`exercise_workout` (`exercise_id`, `workout_id`) VALUES (UUID_TO_BIN('abff0bae-f7e9-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('c1873571-f7ec-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise_workout` (`exercise_id`, `workout_id`) VALUES (UUID_TO_BIN('abff1ad7-f7e9-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('c1873571-f7ec-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise_workout` (`exercise_id`, `workout_id`) VALUES (UUID_TO_BIN('abff28d8-f7e9-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('c1873571-f7ec-11ed-bcc5-a85e45c41921'));

INSERT INTO `limitless`.`exercise_workout` (`exercise_id`, `workout_id`) VALUES (UUID_TO_BIN('abfebb9c-f7e9-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('c18745aa-f7ec-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise_workout` (`exercise_id`, `workout_id`) VALUES (UUID_TO_BIN('abfed15f-f7e9-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('c18745aa-f7ec-11ed-bcc5-a85e45c41921'));
INSERT INTO `limitless`.`exercise_workout` (`exercise_id`, `workout_id`) VALUES (UUID_TO_BIN('abfef97b-f7e9-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('c18745aa-f7ec-11ed-bcc5-a85e45c41921'));

INSERT INTO `limitless`.`exercise_workout` (`exercise_id`, `workout_id`) VALUES (UUID_TO_BIN('80b2b659-f7e7-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('b8f84835-036d-11ee-bc40-0e9bf7f9a15b'));
INSERT INTO `limitless`.`exercise_workout` (`exercise_id`, `workout_id`) VALUES (UUID_TO_BIN('80b2ddc0-f7e7-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('b8f84835-036d-11ee-bc40-0e9bf7f9a15b'));
INSERT INTO `limitless`.`exercise_workout` (`exercise_id`, `workout_id`) VALUES (UUID_TO_BIN('80b2fc49-f7e7-11ed-bcc5-a85e45c41921') , UUID_TO_BIN('b8f84835-036d-11ee-bc40-0e9bf7f9a15b'));
