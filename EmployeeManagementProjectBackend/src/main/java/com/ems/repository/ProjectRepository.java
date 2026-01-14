package com.ems.repository;

import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import com.ems.entity.ProjectDetails;

public interface ProjectRepository extends JpaRepository<ProjectDetails, Long> {

    @Query("SELECT p FROM ProjectDetails p WHERE p.employee.id = :empId")
    List<ProjectDetails> findByEmployeeId(@Param("empId") Long empId);
}
