package com.reliability.platform.service;

import com.reliability.platform.model.IncidentRecord;
import com.reliability.platform.model.IncidentStatus;
import com.reliability.platform.repository.IncidentRecordRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class IncidentManagementService {

    private final IncidentRecordRepository incidentRepository;

    public IncidentManagementService(IncidentRecordRepository incidentRepository) {
        this.incidentRepository = incidentRepository;
    }

    public List<IncidentRecord> getAllActiveIncidents() {
        return incidentRepository.findByStatusNot(IncidentStatus.RESOLVED);
    }

    public List<IncidentRecord> getAllIncidents() {
        return incidentRepository.findAll();
    }

    public IncidentRecord updateIncidentStatus(Long incidentId, IncidentStatus newStatus) {
        IncidentRecord incident = incidentRepository.findById(incidentId).orElse(null);
        if (incident != null) {
            incident.setStatus(newStatus);
            if (newStatus == IncidentStatus.RESOLVED) {
                incident.setResolvedAt(Instant.now());
            }
            return incidentRepository.save(incident);
        }
        return null;
    }
}
