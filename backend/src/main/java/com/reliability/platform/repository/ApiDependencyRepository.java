package com.reliability.platform.repository;

import com.reliability.platform.model.ApiDependency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApiDependencyRepository extends JpaRepository<ApiDependency, Long> {
    List<ApiDependency> findBySourceApiId(Long sourceApiId);
    List<ApiDependency> findByTargetApiId(Long targetApiId);
}
