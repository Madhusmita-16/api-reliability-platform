package com.reliability.platform.controller;

import com.reliability.platform.dto.RootCauseAnalysisDto;
import com.reliability.platform.model.ApiDependency;
import com.reliability.platform.repository.ApiDependencyRepository;
import com.reliability.platform.service.DependencyIntelligenceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/dependencies")
public class DependencyController {

    private final ApiDependencyRepository dependencyRepository;
    private final DependencyIntelligenceService intelligenceService;

    public DependencyController(ApiDependencyRepository dependencyRepository, DependencyIntelligenceService intelligenceService) {
        this.dependencyRepository = dependencyRepository;
        this.intelligenceService = intelligenceService;
    }

    @GetMapping("/graph")
    public List<ApiDependency> getAllDependencies() {
        return dependencyRepository.findAll();
    }

    @GetMapping("/root-cause/{apiId}")
    public RootCauseAnalysisDto getRootCauseAnalysis(@PathVariable Long apiId) {
        return intelligenceService.analyzeRootCause(apiId);
    }
}
