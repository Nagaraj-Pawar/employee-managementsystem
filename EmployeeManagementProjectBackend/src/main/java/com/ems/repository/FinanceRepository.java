package com.ems.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import com.ems.entity.FinanceDetails;

public interface FinanceRepository extends JpaRepository<FinanceDetails, Long> {

    @Query("SELECT f FROM FinanceDetails f WHERE f.employee.id = :empId")
    FinanceDetails findByEmployeeId(@Param("empId") Long empId);

    @Query("SELECT SUM(f.netSalary) FROM FinanceDetails f")
    Double totalSalaryPaid();
}
