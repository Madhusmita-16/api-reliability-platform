package com.reliability.platform.controller;

import com.reliability.platform.model.ApiService;
import com.reliability.platform.model.CircuitBreakerState;
import com.reliability.platform.service.ResilienceManagerService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/resilience")
public class ResilienceController {

    private final ResilienceManagerService resilienceService;

    public ResilienceController(ResilienceManagerService resilienceService) {
        this.resilienceService = resilienceService;
    }

    @PostMapping("/circuit-breaker/{apiId}")
    public ApiService updateState(@PathVariable Long apiId, @RequestParam CircuitBreakerState state) {
        return resilienceService.updateCircuitState(apiId, state);
    }

    @PostMapping("/auto-recover/{apiId}")
    public Map<String, Object> autoRecover(@PathVariable Long apiId) {
        return resilienceService.triggerAutoRecovery(apiId);
    }
}
