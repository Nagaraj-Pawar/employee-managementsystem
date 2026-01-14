package com.ems.dto;

import java.util.List;

import com.ems.entity.Employee;
import com.ems.entity.FinanceDetails;
import com.ems.entity.ProjectDetails;

import lombok.Data;

@Data
public class EmployeeDashboardDTO {

    private Long id;
    private String employeeId;
    private String name;
    private String email;
    private String department;
    private String role;

    private List<ProjectDetails> projects;
    private FinanceDetails finance;

    public EmployeeDashboardDTO(Employee e) {
        this.id = e.getId();
        this.employeeId = e.getEmployeeId();
        this.name = e.getName();
        this.email = e.getEmail();
        this.department = e.getDepartment();
        this.role = e.getRole();
    }
}
