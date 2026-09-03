package com.reliability.platform.repository;

import com.reliability.platform.model.ApiService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApiServiceRepository extends JpaRepository<ApiService, Long> {
}
