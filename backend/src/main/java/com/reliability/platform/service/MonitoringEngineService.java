package com.reliability.platform.service;

import com.reliability.platform.model.ApiMetrics;
import com.reliability.platform.model.ApiService;
import com.reliability.platform.repository.ApiMetricsRepository;
import com.reliability.platform.repository.ApiServiceRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executor;

@Service
public class MonitoringEngineService {

    private final ApiServiceRepository apiRepository;
    private final ApiMetricsRepository metricsRepository;
    private final Executor executor;
    private final AnomalyDetectionService anomalyService;
    private final Random random = new Random();

    public MonitoringEngineService(
            ApiServiceRepository apiRepository,
            ApiMetricsRepository metricsRepository,
            @Qualifier("monitoringExecutor") Executor executor,
            AnomalyDetectionService anomalyService
    ) {
        this.apiRepository = apiRepository;
        this.metricsRepository = metricsRepository;
        this.executor = executor;
        this.anomalyService = anomalyService;
    }

    @Scheduled(fixedRate = 15000) // Scheduled execution every 15 seconds
    public void scheduleMonitoringBatch() {
        executeConcurrentCheck();
    }

    public List<ApiMetrics> executeConcurrentCheck() {
        List<ApiService> apis = apiRepository.findAll();
        if (apis.isEmpty()) {
            return new ArrayList<>();
        }

        List<CompletableFuture<ApiMetrics>> futures = apis.stream()
                .map(api -> CompletableFuture.supplyAsync(() -> checkSingleApi(api), executor))
                .toList();

        CompletableFuture<Void> allOf = CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]));
        allOf.join();

        List<ApiMetrics> results = futures.stream()
                .map(CompletableFuture::join)
                .toList();

        // Run anomaly detection pass
        for (ApiService api : apis) {
            anomalyService.evaluateAnomaliesForApi(api);
        }

        return results;
    }

    public ApiMetrics checkSingleApi(ApiService api) {
        long startTime = System.currentTimeMillis();
        boolean isSuccess = true;
        int statusCode = api.getExpectedStatus();
        long latencyMs;

        // If circuit breaker is OPEN, short-circuit
        if (api.getCircuitState() == com.reliability.platform.model.CircuitBreakerState.OPEN) {
            latencyMs = 0;
            isSuccess = false;
            statusCode = 503;
        } else {
            // Simulated probe check (with baseline variance per API)
            try {
                if ("Inventory Service".equals(api.getName())) {
                    // Simulate elevated latency or anomaly
                    latencyMs = 350 + random.nextInt(450);
                    if (random.nextDouble() < 0.15) {
                        isSuccess = false;
                        statusCode = 504;
                    }
                } else if ("Notification Service".equals(api.getName())) {
                    // High error rate simulation
                    latencyMs = 120 + random.nextInt(180);
                    if (random.nextDouble() < 0.30) {
                        isSuccess = false;
                        statusCode = 500;
                    }
                } else {
                    // Normal healthy operation
                    latencyMs = 45 + random.nextInt(90);
                    if (random.nextDouble() < 0.02) {
                        isSuccess = false;
                        statusCode = 502;
                    }
                }
            } catch (Exception e) {
                isSuccess = false;
                statusCode = 500;
                latencyMs = System.currentTimeMillis() - startTime;
            }
        }

        ApiMetrics metric = new ApiMetrics(api.getId(), latencyMs, statusCode, isSuccess);
        metricsRepository.save(metric);

        api.setLastPingedAt(Instant.now());
        apiRepository.save(api);

        return metric;
    }
}
