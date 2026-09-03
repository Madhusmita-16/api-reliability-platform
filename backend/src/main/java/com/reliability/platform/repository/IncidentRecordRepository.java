package com.reliability.platform.repository;

import com.reliability.platform.model.IncidentRecord;
import com.reliability.platform.model.IncidentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IncidentRecordRepository extends JpaRepository<IncidentRecord, Long> {
    List<IncidentRecord> findByStatusNot(IncidentStatus status);
    List<IncidentRecord> findByApiId(Long apiId);
}
