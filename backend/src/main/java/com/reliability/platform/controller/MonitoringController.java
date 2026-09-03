package com.reliability.platform.controller;

import com.reliability.platform.dto.HealthScoreResult;
import com.reliability.platform.model.ApiMetrics;
import com.reliability.platform.model.ApiService;
import com.reliability.platform.repository.ApiMetricsRepository;
import com.reliability.platform.repository.ApiServiceRepository;
import com.reliability.platform.service.HealthScoreCalculatorService;
import com.reliability.platform.service.MonitoringEngineService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/monitoring")
public class MonitoringController {

    private final ApiServiceRepository apiRepository;
    private final ApiMetricsRepository metricsRepository;
    private final MonitoringEngineService monitoringEngine;
    private final HealthScoreCalculatorService healthCalculator;

    public MonitoringController(
            ApiServiceRepository apiRepository,
            ApiMetricsRepository metricsRepository,
            MonitoringEngineService monitoringEngine,
            HealthScoreCalculatorService healthCalculator
    ) {
        this.apiRepository = apiRepository;
        this.metricsRepository = metricsRepository;
        this.monitoringEngine = monitoringEngine;
        this.healthCalculator = healthCalculator;
    }

    @GetMapping("/health-scores")
    public List<HealthScoreResult> getHealthScores() {
        List<ApiService> apis = apiRepository.findAll();
        return apis.stream()
                .map(healthCalculator::calculateHealthScore)
                .toList();
    }

    @PostMapping("/check-now")
    public List<ApiMetrics> triggerCheckNow() {
        return monitoringEngine.executeConcurrentCheck();
    }

    @GetMapping("/metrics/{apiId}")
    public List<ApiMetrics> getMetricsForApi(@PathVariable Long apiId) {
        return metricsRepository.findTop50ByApiIdOrderByTimestampDesc(apiId);
    }
}
