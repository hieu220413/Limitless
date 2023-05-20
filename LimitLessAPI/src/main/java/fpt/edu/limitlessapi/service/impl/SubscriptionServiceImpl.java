package fpt.edu.limitlessapi.service.impl;

import fpt.edu.limitlessapi.entity.Subscription;
import fpt.edu.limitlessapi.entity.Users;
import fpt.edu.limitlessapi.exception.DuplicateSubscriptionException;
import fpt.edu.limitlessapi.exception.InvalidSubscriptionInputException;
import fpt.edu.limitlessapi.model.SubscriptionRequestBody;
import fpt.edu.limitlessapi.model.SubscriptionResponseBody;
import fpt.edu.limitlessapi.repository.SubscriptionRepository;
import fpt.edu.limitlessapi.repository.UserRepository;
import fpt.edu.limitlessapi.service.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Optional;
import java.util.UUID;

@Service
public class SubscriptionServiceImpl implements SubscriptionService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Override
    public SubscriptionResponseBody subscriptionRequestBody(SubscriptionRequestBody subscriptionRequestBody) {
        HashMap errorFields = new HashMap<>();
        Optional<Users> userEntity =  userRepository.findById(UUID.fromString(subscriptionRequestBody.getUserId()));
        if(subscriptionRequestBody.getPrice() <= 0){
            errorFields.put("priceError", "Price can not be lower than or equal 0");
        }

        if(subscriptionRequestBody.getDuration() <= 0){
            errorFields.put("durationError", "Duration can not be lower than or equal 0");
        }

        if(!userEntity.isPresent()){
            errorFields.put("userIdError", "No user found");
        }

        if(errorFields.size() > 0){
            throw new InvalidSubscriptionInputException("UNPROCESSABLE_ENTITY", errorFields);
        }

        if(subscriptionRepository.findActiveSubscription() != null){
            throw new DuplicateSubscriptionException("FORBIDDEN");
        }

        LocalDateTime startDate = LocalDateTime.now().withNano(0);
        LocalDateTime endDate = startDate.plusMonths(subscriptionRequestBody.getDuration());

        Subscription subscription = Subscription.builder()
                        .price(subscriptionRequestBody.getPrice())
                                .startDate(startDate)
                                        .endDate(endDate)
                                                .user(userEntity.get())
                                                        .build();
        Subscription subscriptionSaved = subscriptionRepository.save(subscription);
        SubscriptionResponseBody subscriptionResponseBody = new SubscriptionResponseBody(subscriptionSaved);
        return subscriptionResponseBody;
    }
}
