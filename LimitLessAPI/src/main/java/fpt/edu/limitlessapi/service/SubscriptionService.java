package fpt.edu.limitlessapi.service;

import fpt.edu.limitlessapi.model.SubscriptionRequestBody;
import fpt.edu.limitlessapi.model.SubscriptionResponseBody;

import java.util.HashMap;

public interface SubscriptionService {
    SubscriptionResponseBody subscriptionRequestBody(SubscriptionRequestBody subscriptionRequestBody);

    HashMap checkActiveSubscription(String userId);
}
