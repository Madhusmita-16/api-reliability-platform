package com.reliability.platform.service;

import com.reliability.platform.dto.HealthScoreResult;
import com.reliability.platform.model.ApiMetrics;
import com.reliability.platform.model.ApiService;
import com.reliability.platform.repository.ApiMetricsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HealthScoreCalculatorService {

    private final ApiMetricsRepository metricsRepository;

    public HealthScoreCalculatorService(ApiMetricsRepository metricsRepository) {
        this.metricsRepository = metricsRepository;
    }

    public HealthScoreResult calculateHealthScore(ApiService api) {
        List<ApiMetrics> recentMetrics = metricsRepository.findTop50ByApiIdOrderByTimestampDesc(api.getId());

        if (recentMetrics.isEmpty()) {
            return new HealthScoreResult(api.getId(), api.getName(), 100.0, 100.0, 100.0, 100.0, 100.0, 100.0);
        }

        // 1. Availability Score (40%)
        long successCount = recentMetrics.stream().filter(ApiMetrics::getIsSuccess).count();
        double availabilityScore = ((double) successCount / recentMetrics.size()) * 100.0;

        // 2. Latency Score (25%)
        double avgLatency = recentMetrics.stream().mapToLong(ApiMetrics::getLatencyMs).average().orElse(150.0);
        double latencyScore = 100.0;
        if (avgLatency > 2000) {
            latencyScore = 20.0;
        } else if (avgLatency > 1000) {
            latencyScore = 50.0;
        } else if (avgLatency > 500) {
            latencyScore = 75.0;
        } else if (avgLatency > 250) {
            latencyScore = 90.0;
        }

        // 3. Error Rate Score (20%)
        double errorRate = 100.0 - availabilityScore;
        double errorScore = Math.max(0.0, 100.0 - (errorRate * 3.0));

        // 4. Dependency Health Score (10%)
        double dependencyScore = (api.getCircuitState() == com.reliability.platform.model.CircuitBreakerState.CLOSED) ? 100.0 : 40.0;

        // 5. Traffic Stability Score (5%)
        double trafficScore = 95.0;

        // Weighted calculation formula
        double overallScore = (availabilityScore * 0.40) +
                             (latencyScore * 0.25) +
                             (errorScore * 0.20) +
                             (dependencyScore * 0.10) +
                             (trafficScore * 0.05);

        return new HealthScoreResult(
                api.getId(),
                api.getName(),
                overallScore,
                availabilityScore,
                latencyScore,
                errorScore,
                dependencyScore,
                trafficScore
        );
    }
}
