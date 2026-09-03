package com.reliability.platform.repository;

import com.reliability.platform.model.ApiMetrics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApiMetricsRepository extends JpaRepository<ApiMetrics, Long> {
    List<ApiMetrics> findTop50ByApiIdOrderByTimestampDesc(Long apiId);
    List<ApiMetrics> findByApiId(Long apiId);
}
