package com.reliability.platform.controller;

import com.reliability.platform.model.IncidentRecord;
import com.reliability.platform.model.IncidentStatus;
import com.reliability.platform.service.IncidentManagementService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/incidents")
public class IncidentController {

    private final IncidentManagementService incidentService;

    public IncidentController(IncidentManagementService incidentService) {
        this.incidentService = incidentService;
    }

    @GetMapping
    public List<IncidentRecord> getAllIncidents() {
        return incidentService.getAllIncidents();
    }

    @GetMapping("/active")
    public List<IncidentRecord> getActiveIncidents() {
        return incidentService.getAllActiveIncidents();
    }

    @PutMapping("/{id}/status")
    public IncidentRecord updateStatus(@PathVariable Long id, @RequestParam IncidentStatus status) {
        return incidentService.updateIncidentStatus(id, status);
    }
}
