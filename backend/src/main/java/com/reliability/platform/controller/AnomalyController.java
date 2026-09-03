package com.reliability.platform.controller;

import com.reliability.platform.model.AnomalyRecord;
import com.reliability.platform.repository.AnomalyRecordRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/anomalies")
public class AnomalyController {

    private final AnomalyRecordRepository anomalyRepository;

    public AnomalyController(AnomalyRecordRepository anomalyRepository) {
        this.anomalyRepository = anomalyRepository;
    }

    @GetMapping
    public List<AnomalyRecord> getRecentAnomalies() {
        return anomalyRepository.findTop20ByOrderByDetectedAtDesc();
    }
}
