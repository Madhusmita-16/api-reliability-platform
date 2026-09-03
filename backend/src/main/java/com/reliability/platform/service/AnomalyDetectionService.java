package com.reliability.platform.service;

import com.reliability.platform.model.AnomalyRecord;
import com.reliability.platform.model.ApiMetrics;
import com.reliability.platform.model.ApiService;
import com.reliability.platform.repository.AnomalyRecordRepository;
import com.reliability.platform.repository.ApiMetricsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnomalyDetectionService {

    private final ApiMetricsRepository metricsRepository;
    private final AnomalyRecordRepository anomalyRepository;

    public AnomalyDetectionService(ApiMetricsRepository metricsRepository, AnomalyRecordRepository anomalyRepository) {
        this.metricsRepository = metricsRepository;
        this.anomalyRepository = anomalyRepository;
    }

    public void evaluateAnomaliesForApi(ApiService api) {
        List<ApiMetrics> recent = metricsRepository.findTop50ByApiIdOrderByTimestampDesc(api.getId());
        if (recent.size() < 5) return;

        double[] latencies = recent.stream().mapToDouble(ApiMetrics::getLatencyMs).toArray();

        // 1. Moving Average
        double sum = 0;
        for (double d : latencies) sum += d;
        double average = sum / latencies.length;

        // 2. Standard Deviation
        double temp = 0;
        for (double d : latencies) {
            temp += (d - average) * (d - average);
        }
        double stdDev = Math.sqrt(temp / latencies.length);

        if (stdDev < 1.0) stdDev = 1.0; // avoid div by zero

        ApiMetrics latest = recent.get(0);
        double currentLatency = latest.getLatencyMs();
        double zScore = (currentLatency - average) / stdDev;

        // Anomaly threshold check: Z-Score > 2.0 or latency > average + 2 * stdDev
        if (zScore > 2.0 || currentLatency > (average + (2 * stdDev))) {
            String desc = String.format("Latency spike of %d ms detected for %s (Baseline Avg: %.1f ms, StdDev: %.1f, Z-Score: %.2f)",
                    latest.getLatencyMs(), api.getName(), average, stdDev, zScore);

            AnomalyRecord record = new AnomalyRecord(
                    api.getId(),
                    api.getName(),
                    "LATENCY_SPIKE",
                    desc,
                    currentLatency,
                    average,
                    zScore
            );
            anomalyRepository.save(record);
        }
    }
}
