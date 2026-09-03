package com.reliability.platform.controller;

import com.reliability.platform.dto.ApiRegistrationRequest;
import com.reliability.platform.model.ApiService;
import com.reliability.platform.repository.ApiServiceRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/apis")
public class ApiController {

    private final ApiServiceRepository apiRepository;

    public ApiController(ApiServiceRepository apiRepository) {
        this.apiRepository = apiRepository;
    }

    @GetMapping
    public List<ApiService> getAllApis() {
        return apiRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiService> getApiById(@PathVariable Long id) {
        return apiRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ApiService> registerApi(@RequestBody ApiRegistrationRequest request) {
        ApiService api = new ApiService(
                request.getName(),
                request.getBaseUrl(),
                request.getHealthEndpoint(),
                request.getTimeout(),
                request.getExpectedStatus(),
                request.getEnvironment(),
                request.getOwnerTeam()
        );
        ApiService saved = apiRepository.save(api);
        return ResponseEntity.ok(saved);
    }
}
