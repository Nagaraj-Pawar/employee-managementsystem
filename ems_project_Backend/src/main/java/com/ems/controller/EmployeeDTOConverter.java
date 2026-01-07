package com.ems.controller;

import org.springframework.stereotype.Component;

import com.ems.dto.EmployeeDTO;
import com.ems.entity.Employee;
import com.ems.entity.Finance;
import com.ems.entity.ProfessionalDetails;
import com.ems.entity.Project;

import java.util.ArrayList;
import java.util.List;

@Component
public class EmployeeDTOConverter {

    public EmployeeDTO convertToDTO(Employee employee) {

        EmployeeDTO dto = new EmployeeDTO();

        // 🔹 ONLY SET SIMPLE DATA (NOT ENTITY REFERENCE)
        dto.setPersonalDetails(employee);

        // 🔹 CREATE NEW OBJECTS (DETACHED SAFE COPIES)
        if (employee.getProfessionalDetails() != null) {
            ProfessionalDetails prof = employee.getProfessionalDetails();
            ProfessionalDetails profCopy = new ProfessionalDetails(
                prof.getProfDetailId(),
                null, // ❌ DO NOT SET EMPLOYEE
                prof.getCompanyEmail(),
                prof.getOfficePhone(),
                prof.getOfficeCity(),
                prof.getOfficeAddress(),
                prof.getReportingManager(),
                prof.getHrName(),
                prof.getDateOfJoining()
            );
            dto.setProfessionalDetails(profCopy);
        }

        if (employee.getFinance() != null) {
            Finance fin = employee.getFinance();
            Finance finCopy = new Finance(
                fin.getFinanceId(),
                null, // ❌ DO NOT SET EMPLOYEE
                fin.getPanCard(),
                fin.getAadharCard(),
                fin.getBankName(),
                fin.getBranch(),
                fin.getIfscCode(),
                fin.getCtcBreakup()
            );
            dto.setFinanceDetails(finCopy);
        }

        if (employee.getProjects() != null) {
            List<Project> projectCopies = new ArrayList<>();
            for (Project p : employee.getProjects()) {
                Project pCopy = new Project(
                    p.getProjectId(),
                    p.getProjectCode(),
                    p.getStartDate(),
                    p.getEndDate(),
                    p.getClientName(),
                    p.getReportingManager(),
                    null // ❌ DO NOT SET EMPLOYEE
                );
                projectCopies.add(pCopy);
            }
            dto.setProjectDetails(projectCopies);
        }

        return dto;
    }

    public List<EmployeeDTO> convertToDTOs(List<Employee> employees) {
        List<EmployeeDTO> list = new ArrayList<>();
        for (Employee e : employees) {
            list.add(convertToDTO(e));
        }
        return list;
    }
}
