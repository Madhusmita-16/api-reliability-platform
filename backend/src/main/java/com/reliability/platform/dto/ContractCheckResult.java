package com.reliability.platform.dto;

import java.util.List;

public class ContractCheckResult {
    private Long apiId;
    private String apiName;
    private boolean isCompatible;
    private List<String> removedFields;
    private List<String> addedFields;
    private List<String> typeMismatches;
    private String summary;

    public ContractCheckResult(Long apiId, String apiName, boolean isCompatible, List<String> removedFields, List<String> addedFields, List<String> typeMismatches, String summary) {
        this.apiId = apiId;
        this.apiName = apiName;
        this.isCompatible = isCompatible;
        this.removedFields = removedFields;
        this.addedFields = addedFields;
        this.typeMismatches = typeMismatches;
        this.summary = summary;
    }

    public Long getApiId() { return apiId; }
    public String getApiName() { return apiName; }
    public boolean isCompatible() { return isCompatible; }
    public List<String> getRemovedFields() { return removedFields; }
    public List<String> getAddedFields() { return addedFields; }
    public List<String> getTypeMismatches() { return typeMismatches; }
    public String getSummary() { return summary; }
}
