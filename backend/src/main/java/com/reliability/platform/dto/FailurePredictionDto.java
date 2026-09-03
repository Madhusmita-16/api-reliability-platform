package com.reliability.platform.dto;

import java.util.List;

public class FailurePredictionDto {
    private Long apiId;
    private String apiName;
    private double currentScore;
    private List<Double> scoreTrend; // e.g. [98.0, 96.0, 93.0, 89.0, 82.0]
    private double degradationProbabilityPercentage; // e.g. 87.5%
    private String riskLevel; // LOW, MODERATE, HIGH, CRITICAL
    private String warningMessage;
    private List<String> contributingFactors;

    public FailurePredictionDto(Long apiId, String apiName, double currentScore, List<Double> scoreTrend, double degradationProbabilityPercentage, String riskLevel, String warningMessage, List<String> contributingFactors) {
        this.apiId = apiId;
        this.apiName = apiName;
        this.currentScore = currentScore;
        this.scoreTrend = scoreTrend;
        this.degradationProbabilityPercentage = degradationProbabilityPercentage;
        this.riskLevel = riskLevel;
        this.warningMessage = warningMessage;
        this.contributingFactors = contributingFactors;
    }

    public Long getApiId() { return apiId; }
    public String getApiName() { return apiName; }
    public double getCurrentScore() { return currentScore; }
    public List<Double> getScoreTrend() { return scoreTrend; }
    public double getDegradationProbabilityPercentage() { return degradationProbabilityPercentage; }
    public String getRiskLevel() { return riskLevel; }
    public String getWarningMessage() { return warningMessage; }
    public List<String> getContributingFactors() { return contributingFactors; }
}
