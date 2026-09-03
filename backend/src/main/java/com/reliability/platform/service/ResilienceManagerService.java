package com.reliability.platform.service;

import com.reliability.platform.model.ApiService;
import com.reliability.platform.model.CircuitBreakerState;
import com.reliability.platform.repository.ApiServiceRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ResilienceManagerService {

    private final ApiServiceRepository apiRepository;

    public ResilienceManagerService(ApiServiceRepository apiRepository) {
        this.apiRepository = apiRepository;
    }

    public ApiService updateCircuitState(Long apiId, CircuitBreakerState newState) {
        ApiService api = apiRepository.findById(apiId).orElse(null);
        if (api != null) {
            api.setCircuitState(newState);
            return apiRepository.save(api);
        }
        return null;
    }

    public Map<String, Object> triggerAutoRecovery(Long apiId) {
        ApiService api = apiRepository.findById(apiId).orElse(null);
        Map<String, Object> response = new HashMap<>();

        if (api != null) {
            // Reset circuit breaker to HALF_OPEN -> test -> CLOSED
            api.setCircuitState(CircuitBreakerState.HALF_OPEN);
            apiRepository.save(api);

            response.put("apiId", apiId);
            response.put("apiName", api.getName());
            response.put("action", "AUTOMATED_RECOVERY_INITIATED");
            response.put("newCircuitState", "HALF_OPEN");
            response.put("status", "SUCCESS");
            response.put("message", "Triggered automated probe test. Circuit state set to HALF_OPEN. Self-healing active.");
        } else {
            response.put("status", "FAILED");
            response.put("message", "API Service not found.");
        }
        return response;
    }
}
