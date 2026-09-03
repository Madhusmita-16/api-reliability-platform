package com.reliability.platform.repository;


import com.reliability.platform.model.ContractSchema;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ContractSchemaRepository extends JpaRepository<ContractSchema, Long> {
    Optional<ContractSchema> findByApiId(Long apiId);
}
