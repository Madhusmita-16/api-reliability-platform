package com.reliability.platform.dto;

import java.util.List;

public class RootCauseAnalysisDto {
    private Long targetApiId;
    private String targetApiName;
    private Long rootCauseApiId;
    private String rootCauseApiName;
    private String rootCauseComponent; // e.g. "Inventory Database Connection Pool Exhaustion"
    private List<String> dependencyChain;
    private double confidenceScore; // 0.0 - 1.0

    public RootCauseAnalysisDto(Long targetApiId, String targetApiName, Long rootCauseApiId, String rootCauseApiName, String rootCauseComponent, List<String> dependencyChain, double confidenceScore) {
        this.targetApiId = targetApiId;
        this.targetApiName = targetApiName;
        this.rootCauseApiId = rootCauseApiId;
        this.rootCauseApiName = rootCauseApiName;
        this.rootCauseComponent = rootCauseComponent;
        this.dependencyChain = dependencyChain;
        this.confidenceScore = confidenceScore;
    }

    public Long getTargetApiId() { return targetApiId; }
    public String getTargetApiName() { return targetApiName; }
    public Long getRootCauseApiId() { return rootCauseApiId; }
    public String getRootCauseApiName() { return rootCauseApiName; }
    public String getRootCauseComponent() { return rootCauseComponent; }
    public List<String> getDependencyChain() { return dependencyChain; }
    public double getConfidenceScore() { return confidenceScore; }
}
