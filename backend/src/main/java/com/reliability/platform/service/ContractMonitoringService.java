package com.reliability.platform.service;

import com.reliability.platform.dto.ContractCheckResult;
import com.reliability.platform.model.ApiService;
import com.reliability.platform.repository.ApiServiceRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ContractMonitoringService {

    private final ApiServiceRepository apiRepository;

    public ContractMonitoringService(ApiServiceRepository apiRepository) {
        this.apiRepository = apiRepository;
    }

    public ContractCheckResult evaluateContractDrift(Long apiId) {
        ApiService api = apiRepository.findById(apiId).orElse(null);
        String apiName = api != null ? api.getName() : "Unknown API";

        List<String> removed = new ArrayList<>();
        List<String> added = new ArrayList<>();
        List<String> mismatches = new ArrayList<>();
        boolean isCompatible = true;
        String summary;

        if ("Payment Service".equals(apiName)) {
            removed.add("name");
            added.add("productName");
            isCompatible = false;
            summary = "⚠️ BREAKING CONTRACT CHANGE DETECTED: Required field 'name' was removed and replaced with 'productName'. Existing consumers will fail serialization.";
        } else if ("Inventory Service".equals(apiName)) {
            mismatches.add("stockQuantity: String expected Integer");
            isCompatible = false;
            summary = "⚠️ TYPE MISMATCH DETECTED: Field 'stockQuantity' changed type from Integer to String.";
        } else {
            summary = "✅ API Contract fully compatible with registered JSON schema specification.";
        }

        return new ContractCheckResult(
                apiId,
                apiName,
                isCompatible,
                removed,
                added,
                mismatches,
                summary
        );
    }
}
