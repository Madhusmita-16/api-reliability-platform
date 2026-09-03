package com.reliability.platform.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "incident_records")
public class IncidentRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long apiId;
    private String apiName;
    private String title;
    private String summary;

    @Enumerated(EnumType.STRING)
    private IncidentSeverity severity;

    @Enumerated(EnumType.STRING)
    private IncidentStatus status = IncidentStatus.DETECTED;

    private String probableRootCause;
    private Instant createdAt = Instant.now();
    private Instant resolvedAt;

    public IncidentRecord() {}

    public IncidentRecord(Long apiId, String apiName, String title, String summary, IncidentSeverity severity, String probableRootCause) {
        this.apiId = apiId;
        this.apiName = apiName;
        this.title = title;
        this.summary = summary;
        this.severity = severity != null ? severity : IncidentSeverity.MEDIUM;
        this.status = IncidentStatus.DETECTED;
        this.probableRootCause = probableRootCause;
        this.createdAt = Instant.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getApiId() { return apiId; }
    public void setApiId(Long apiId) { this.apiId = apiId; }

    public String getApiName() { return apiName; }
    public void setApiName(String apiName) { this.apiName = apiName; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    public IncidentSeverity getSeverity() { return severity; }
    public void setSeverity(IncidentSeverity severity) { this.severity = severity; }

    public IncidentStatus getStatus() { return status; }
    public void setStatus(IncidentStatus status) { this.status = status; }

    public String getProbableRootCause() { return probableRootCause; }
    public void setProbableRootCause(String probableRootCause) { this.probableRootCause = probableRootCause; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public Instant getResolvedAt() { return resolvedAt; }
    public void setResolvedAt(Instant resolvedAt) { this.resolvedAt = resolvedAt; }
}
