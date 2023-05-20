package fpt.edu.limitlessapi.service;

import fpt.edu.limitlessapi.model.SubscriptionRequestBody;
import fpt.edu.limitlessapi.model.SubscriptionResponseBody;

public interface SubscriptionService {
    SubscriptionResponseBody subscriptionRequestBody(SubscriptionRequestBody subscriptionRequestBody);
}
