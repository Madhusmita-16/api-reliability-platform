package com.reliability.platform.service;

import com.reliability.platform.model.*;
import com.reliability.platform.repository.*;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Random;

@Service
public class DataInitializerService {

    private final ApiServiceRepository apiRepository;
    private final ApiMetricsRepository metricsRepository;
    private final ApiDependencyRepository dependencyRepository;
    private final AnomalyRecordRepository anomalyRepository;
    private final IncidentRecordRepository incidentRepository;
    private final ContractSchemaRepository contractRepository;
    private final Random random = new Random();

    public DataInitializerService(
            ApiServiceRepository apiRepository,
            ApiMetricsRepository metricsRepository,
            ApiDependencyRepository dependencyRepository,
            AnomalyRecordRepository anomalyRepository,
            IncidentRecordRepository incidentRepository,
            ContractSchemaRepository contractRepository
    ) {
        this.apiRepository = apiRepository;
        this.metricsRepository = metricsRepository;
        this.dependencyRepository = dependencyRepository;
        this.anomalyRepository = anomalyRepository;
        this.incidentRepository = incidentRepository;
        this.contractRepository = contractRepository;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void seedInitialData() {
        if (apiRepository.count() > 0) return;

        // 1. Seed API Services
        ApiService paymentApi = apiRepository.save(new ApiService("Payment Service", "https://payment.api.internal", "/health", 3000, 200, "Production", "Fintech Core"));
        ApiService userApi = apiRepository.save(new ApiService("User Service", "https://user.api.internal", "/actuator/health", 2000, 200, "Production", "Identity Team"));
        ApiService orderApi = apiRepository.save(new ApiService("Order Service", "https://order.api.internal", "/healthz", 2500, 200, "Production", "Checkout Pod"));
        ApiService inventoryApi = apiRepository.save(new ApiService("Inventory Service", "https://inventory.api.internal", "/status", 4000, 200, "Production", "Logistics Team"));
        ApiService notificationApi = apiRepository.save(new ApiService("Notification Service", "https://notify.api.internal", "/ping", 1500, 200, "Production", "Comms Team"));

        // 2. Seed Dependencies
        dependencyRepository.save(new ApiDependency(orderApi.getId(), paymentApi.getId(), "HTTP_REST"));
        dependencyRepository.save(new ApiDependency(orderApi.getId(), inventoryApi.getId(), "HTTP_REST"));
        dependencyRepository.save(new ApiDependency(inventoryApi.getId(), 99L, "PostgreSQL_DB")); // 99L = DB

        // 3. Seed Metrics History (50 samples per API)
        for (int i = 0; i < 40; i++) {
            metricsRepository.save(new ApiMetrics(paymentApi.getId(), (long) (30 + random.nextInt(40)), 200, true));
            metricsRepository.save(new ApiMetrics(userApi.getId(), (long) (45 + random.nextInt(30)), 200, true));
            metricsRepository.save(new ApiMetrics(orderApi.getId(), (long) (80 + random.nextInt(60)), 200, true));
            
            // Inventory Service has elevated latency curve
            long invLatency = 180 + (i * 12) + random.nextInt(40);
            metricsRepository.save(new ApiMetrics(inventoryApi.getId(), invLatency, 200, true));

            // Notification Service has errors
            boolean notifSuccess = random.nextDouble() > 0.35;
            metricsRepository.save(new ApiMetrics(notificationApi.getId(), (long) (110 + random.nextInt(150)), notifSuccess ? 200 : 500, notifSuccess));
        }

        // 4. Seed Initial Active Anomalies
        anomalyRepository.save(new AnomalyRecord(
                inventoryApi.getId(),
                inventoryApi.getName(),
                "LATENCY_SPIKE",
                "Latency spiked +420% above 15-minute moving average (Baseline 180ms -> Current 780ms)",
                780.0,
                180.0,
                3.85
        ));

        anomalyRepository.save(new AnomalyRecord(
                notificationApi.getId(),
                notificationApi.getName(),
                "ERROR_SPIKE",
                "Error rate breached SLA threshold (Current 35.0% error rate vs 1.0% limit)",
                35.0,
                1.0,
                4.12
        ));

        // 5. Seed Initial Active Incidents
        IncidentRecord inc1 = new IncidentRecord(
                inventoryApi.getId(),
                inventoryApi.getName(),
                "Inventory API Degradation & Latency Spike",
                "High latency response times causing downstream checkout slowdowns.",
                IncidentSeverity.HIGH,
                "Database Connection Pool Exhaustion on Inventory Cluster"
        );
        inc1.setStatus(IncidentStatus.INVESTIGATING);
        incidentRepository.save(inc1);

        IncidentRecord inc2 = new IncidentRecord(
                notificationApi.getId(),
                notificationApi.getName(),
                "Notification Delivery Failures (HTTP 500 Spike)",
                "Error rate spiked to 35% across push/SMS channels.",
                IncidentSeverity.CRITICAL,
                "Third-party SMS Provider Gateway Timeout"
        );
        inc2.setStatus(IncidentStatus.DETECTED);
        incidentRepository.save(inc2);

        // 6. Seed Contract Schema
        ContractSchema schema1 = new ContractSchema(paymentApi.getId(), "{\"type\":\"object\",\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"},\"price\":{\"type\":\"number\"}}}");
        schema1.setLastObservedJsonSchema("{\"type\":\"object\",\"properties\":{\"id\":{\"type\":\"integer\"},\"productName\":{\"type\":\"string\"},\"price\":{\"type\":\"number\"}}}");
        schema1.setHasDrift(true);
        schema1.setDriftSummary("Field 'name' was removed; field 'productName' was added.");
        contractRepository.save(schema1);
    }
}
