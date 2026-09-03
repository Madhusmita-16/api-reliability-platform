package com.reliability.platform.controller;

import com.reliability.platform.dto.FailurePredictionDto;
import com.reliability.platform.service.FailurePredictionService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/prediction")
public class PredictionController {

    private final FailurePredictionService predictionService;

    public PredictionController(FailurePredictionService predictionService) {
        this.predictionService = predictionService;
    }

    @GetMapping("/forecast/{apiId}")
    public FailurePredictionDto getForecastForApi(@PathVariable Long apiId) {
        return predictionService.predictFailureForApi(apiId);
    }
}
