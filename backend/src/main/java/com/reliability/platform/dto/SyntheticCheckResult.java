package com.reliability.platform.dto;

import java.util.Map;

public class SyntheticCheckResult {
    private Long apiId;
    private String apiName;
    private Map<String, String> regionalStatus; // "India": "HEALTHY", "US": "DEGRADED"
    private Map<String, Long> regionalLatencyMs; // "India": 42ms, "US": 320ms

    public SyntheticCheckResult(Long apiId, String apiName, Map<String, String> regionalStatus, Map<String, Long> regionalLatencyMs) {
        this.apiId = apiId;
        this.apiName = apiName;
        this.regionalStatus = regionalStatus;
        this.regionalLatencyMs = regionalLatencyMs;
    }

    public Long getApiId() { return apiId; }
    public String getApiName() { return apiName; }
    public Map<String, String> getRegionalStatus() { return regionalStatus; }
    public Map<String, Long> getRegionalLatencyMs() { return regionalLatencyMs; }
}
