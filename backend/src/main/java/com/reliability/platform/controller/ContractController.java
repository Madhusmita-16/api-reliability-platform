package com.reliability.platform.controller;

import com.reliability.platform.dto.ContractCheckResult;
import com.reliability.platform.service.ContractMonitoringService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/contract")
public class ContractController {

    private final ContractMonitoringService contractService;

    public ContractController(ContractMonitoringService contractService) {
        this.contractService = contractService;
    }

    @GetMapping("/check/{apiId}")
    public ContractCheckResult checkContract(@PathVariable Long apiId) {
        return contractService.evaluateContractDrift(apiId);
    }
}
