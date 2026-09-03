package com.reliability.platform.controller;

import com.reliability.platform.dto.SyntheticCheckResult;
import com.reliability.platform.service.SyntheticMonitoringService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/synthetic")
public class SyntheticController {

    private final SyntheticMonitoringService syntheticService;

    public SyntheticController(SyntheticMonitoringService syntheticService) {
        this.syntheticService = syntheticService;
    }

    @GetMapping("/check/{apiId}")
    public SyntheticCheckResult runCheck(@PathVariable Long apiId) {
        return syntheticService.runSyntheticCheck(apiId);
    }
}
