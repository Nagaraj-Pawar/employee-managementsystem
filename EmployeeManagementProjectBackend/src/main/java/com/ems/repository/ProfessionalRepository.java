package com.ems.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ems.entity.ProfessionalDetails;

public interface ProfessionalRepository
        extends JpaRepository<ProfessionalDetails, Long> {

    Optional<ProfessionalDetails> findByEmployee_Id(Long empId);
}
