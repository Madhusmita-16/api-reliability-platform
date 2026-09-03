package com.reliability.platform.model;

import jakarta.persistence.*;

@Entity
@Table(name = "api_dependencies")
public class ApiDependency {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long sourceApiId;
    private Long targetApiId;
    private String dependencyType; // HTTP, gRPC, Database, Queue

    public ApiDependency() {}

    public ApiDependency(Long sourceApiId, Long targetApiId, String dependencyType) {
        this.sourceApiId = sourceApiId;
        this.targetApiId = targetApiId;
        this.dependencyType = dependencyType != null ? dependencyType : "HTTP";
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getSourceApiId() { return sourceApiId; }
    public void setSourceApiId(Long sourceApiId) { this.sourceApiId = sourceApiId; }

    public Long getTargetApiId() { return targetApiId; }
    public void setTargetApiId(Long targetApiId) { this.targetApiId = targetApiId; }

    public String getDependencyType() { return dependencyType; }
    public void setDependencyType(String dependencyType) { this.dependencyType = dependencyType; }
}
