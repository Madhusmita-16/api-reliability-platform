package com.reliability.platform.dto;

public class HealthScoreResult {
    private Long apiId;
    private String apiName;
    private double overallScore; // 0 - 100
    private double availabilityScore;
    private double latencyScore;
    private double errorScore;
    private double dependencyScore;
    private double trafficScore;
    private String statusBadge; // 🟢, 🟡, 🔴

    public HealthScoreResult(Long apiId, String apiName, double overallScore, double availabilityScore, double latencyScore, double errorScore, double dependencyScore, double trafficScore) {
        this.apiId = apiId;
        this.apiName = apiName;
        this.overallScore = Math.round(overallScore * 10.0) / 10.0;
        this.availabilityScore = Math.round(availabilityScore * 10.0) / 10.0;
        this.latencyScore = Math.round(latencyScore * 10.0) / 10.0;
        this.errorScore = Math.round(errorScore * 10.0) / 10.0;
        this.dependencyScore = Math.round(dependencyScore * 10.0) / 10.0;
        this.trafficScore = Math.round(trafficScore * 10.0) / 10.0;
        
        if (this.overallScore >= 90.0) {
            this.statusBadge = "HEALTHY_GREEN";
        } else if (this.overallScore >= 70.0) {
            this.statusBadge = "DEGRADED_YELLOW";
        } else {
            this.statusBadge = "CRITICAL_RED";
        }
    }

    public Long getApiId() { return apiId; }
    public String getApiName() { return apiName; }
    public double getOverallScore() { return overallScore; }
    public double getAvailabilityScore() { return availabilityScore; }
    public double getLatencyScore() { return latencyScore; }
    public double getErrorScore() { return errorScore; }
    public double getDependencyScore() { return dependencyScore; }
    public double getTrafficScore() { return trafficScore; }
    public String getStatusBadge() { return statusBadge; }
}
