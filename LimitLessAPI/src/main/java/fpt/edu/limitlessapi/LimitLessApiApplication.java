package fpt.edu.limitlessapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan("entity")
public class LimitLessApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(LimitLessApiApplication.class, args);
    }

}
