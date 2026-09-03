package com.reliability.platform.model;

import jakarta.persistence.*;

@Entity
@Table(name = "contract_schemas")
public class ContractSchema {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long apiId;

    @Column(columnDefinition = "TEXT")
    private String expectedJsonSchema;

    @Column(columnDefinition = "TEXT")
    private String lastObservedJsonSchema;

    private Boolean hasDrift = false;
    private String driftSummary;

    public ContractSchema() {}

    public ContractSchema(Long apiId, String expectedJsonSchema) {
        this.apiId = apiId;
        this.expectedJsonSchema = expectedJsonSchema;
        this.hasDrift = false;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getApiId() { return apiId; }
    public void setApiId(Long apiId) { this.apiId = apiId; }

    public String getExpectedJsonSchema() { return expectedJsonSchema; }
    public void setExpectedJsonSchema(String expectedJsonSchema) { this.expectedJsonSchema = expectedJsonSchema; }

    public String getLastObservedJsonSchema() { return lastObservedJsonSchema; }
    public void setLastObservedJsonSchema(String lastObservedJsonSchema) { this.lastObservedJsonSchema = lastObservedJsonSchema; }

    public Boolean getHasDrift() { return hasDrift; }
    public void setHasDrift(Boolean hasDrift) { this.hasDrift = hasDrift; }

    public String getDriftSummary() { return driftSummary; }
    public void setDriftSummary(String driftSummary) { this.driftSummary = driftSummary; }
}
