package com.reliability.platform.repository;

import com.reliability.platform.model.AnomalyRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnomalyRecordRepository extends JpaRepository<AnomalyRecord, Long> {
    List<AnomalyRecord> findTop20ByOrderByDetectedAtDesc();
    List<AnomalyRecord> findByApiId(Long apiId);
}
