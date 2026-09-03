package com.reliability.platform.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "anomaly_records")
public class AnomalyRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long apiId;
    private String apiName;
    private String type; // LATENCY_SPIKE, ERROR_BURST, TRAFFIC_DROP
    private String description;
    private Double currentMetricValue;
    private Double expectedBaseline;
    private Double zScore;
    private Instant detectedAt = Instant.now();

    public AnomalyRecord() {}

    public AnomalyRecord(Long apiId, String apiName, String type, String description, Double currentMetricValue, Double expectedBaseline, Double zScore) {
        this.apiId = apiId;
        this.apiName = apiName;
        this.type = type;
        this.description = description;
        this.currentMetricValue = currentMetricValue;
        this.expectedBaseline = expectedBaseline;
        this.zScore = zScore;
        this.detectedAt = Instant.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getApiId() { return apiId; }
    public void setApiId(Long apiId) { this.apiId = apiId; }

    public String getApiName() { return apiName; }
    public void setApiName(String apiName) { this.apiName = apiName; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getCurrentMetricValue() { return currentMetricValue; }
    public void setCurrentMetricValue(Double currentMetricValue) { this.currentMetricValue = currentMetricValue; }

    public Double getExpectedBaseline() { return expectedBaseline; }
    public void setExpectedBaseline(Double expectedBaseline) { this.expectedBaseline = expectedBaseline; }

    public Double getZScore() { return zScore; }
    public void setZScore(Double zScore) { this.zScore = zScore; }

    public Instant getDetectedAt() { return detectedAt; }
    public void setDetectedAt(Instant detectedAt) { this.detectedAt = detectedAt; }
}
