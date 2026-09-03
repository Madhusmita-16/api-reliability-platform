package com.reliability.platform.service;

import com.reliability.platform.dto.SyntheticCheckResult;
import com.reliability.platform.model.ApiService;
import com.reliability.platform.repository.ApiServiceRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class SyntheticMonitoringService {

    private final ApiServiceRepository apiRepository;

    public SyntheticMonitoringService(ApiServiceRepository apiRepository) {
        this.apiRepository = apiRepository;
    }

    public SyntheticCheckResult runSyntheticCheck(Long apiId) {
        ApiService api = apiRepository.findById(apiId).orElse(null);
        String name = api != null ? api.getName() : "Target API";

        Map<String, String> status = new HashMap<>();
        Map<String, Long> latency = new HashMap<>();

        if ("Payment Service".equals(name)) {
            status.put("India (ap-south-1)", "HEALTHY");
            latency.put("India (ap-south-1)", 38L);

            status.put("Singapore (ap-southeast-1)", "HEALTHY");
            latency.put("Singapore (ap-southeast-1)", 65L);

            status.put("Europe (eu-central-1)", "UNREACHABLE_FAIL");
            latency.put("Europe (eu-central-1)", 0L);

            status.put("US (us-east-1)", "DEGRADED_LATENCY");
            latency.put("US (us-east-1)", 1820L);
        } else {
            status.put("India (ap-south-1)", "HEALTHY");
            latency.put("India (ap-south-1)", 24L);

            status.put("Singapore (ap-southeast-1)", "HEALTHY");
            latency.put("Singapore (ap-southeast-1)", 48L);

            status.put("Europe (eu-central-1)", "HEALTHY");
            latency.put("Europe (eu-central-1)", 110L);

            status.put("US (us-east-1)", "HEALTHY");
            latency.put("US (us-east-1)", 140L);
        }

        return new SyntheticCheckResult(apiId, name, status, latency);
    }
}
