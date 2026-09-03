package com.reliability.platform.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "api_services")
public class ApiService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String baseUrl;
    private String healthEndpoint;
    private Integer timeout; // ms
    private Integer expectedStatus;
    private String environment; // Production, Staging, Dev
    private String ownerTeam;

    @Enumerated(EnumType.STRING)
    private CircuitBreakerState circuitState = CircuitBreakerState.CLOSED;

    private Instant createdAt = Instant.now();
    private Instant lastPingedAt;

    public ApiService() {}

    public ApiService(String name, String baseUrl, String healthEndpoint, Integer timeout, Integer expectedStatus, String environment, String ownerTeam) {
        this.name = name;
        this.baseUrl = baseUrl;
        this.healthEndpoint = healthEndpoint;
        this.timeout = timeout != null ? timeout : 3000;
        this.expectedStatus = expectedStatus != null ? expectedStatus : 200;
        this.environment = environment != null ? environment : "Production";
        this.ownerTeam = ownerTeam != null ? ownerTeam : "Platform Team";
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getBaseUrl() { return baseUrl; }
    public void setBaseUrl(String baseUrl) { this.baseUrl = baseUrl; }

    public String getHealthEndpoint() { return healthEndpoint; }
    public void setHealthEndpoint(String healthEndpoint) { this.healthEndpoint = healthEndpoint; }

    public Integer getTimeout() { return timeout; }
    public void setTimeout(Integer timeout) { this.timeout = timeout; }

    public Integer getExpectedStatus() { return expectedStatus; }
    public void setExpectedStatus(Integer expectedStatus) { this.expectedStatus = expectedStatus; }

    public String getEnvironment() { return environment; }
    public void setEnvironment(String environment) { this.environment = environment; }

    public String getOwnerTeam() { return ownerTeam; }
    public void setOwnerTeam(String ownerTeam) { this.ownerTeam = ownerTeam; }

    public CircuitBreakerState getCircuitState() { return circuitState; }
    public void setCircuitState(CircuitBreakerState circuitState) { this.circuitState = circuitState; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public Instant getLastPingedAt() { return lastPingedAt; }
    public void setLastPingedAt(Instant lastPingedAt) { this.lastPingedAt = lastPingedAt; }
}
