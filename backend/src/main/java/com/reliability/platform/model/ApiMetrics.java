package com.reliability.platform.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "api_metrics")
public class ApiMetrics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long apiId;
    private Long latencyMs;
    private Integer statusCode;
    private Boolean isSuccess;
    private Instant timestamp = Instant.now();

    public ApiMetrics() {}

    public ApiMetrics(Long apiId, Long latencyMs, Integer statusCode, Boolean isSuccess) {
        this.apiId = apiId;
        this.latencyMs = latencyMs;
        this.statusCode = statusCode;
        this.isSuccess = isSuccess;
        this.timestamp = Instant.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getApiId() { return apiId; }
    public void setApiId(Long apiId) { this.apiId = apiId; }

    public Long getLatencyMs() { return latencyMs; }
    public void setLatencyMs(Long latencyMs) { this.latencyMs = latencyMs; }

    public Integer getStatusCode() { return statusCode; }
    public void setStatusCode(Integer statusCode) { this.statusCode = statusCode; }

    public Boolean getIsSuccess() { return isSuccess; }
    public void setIsSuccess(Boolean success) { isSuccess = success; }

    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }
}
