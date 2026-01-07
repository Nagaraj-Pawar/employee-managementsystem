package com.ems.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ems.dto.EmployeeDTO;
import com.ems.entity.Employee;
import com.ems.entity.ProfessionalDetails;
import com.ems.service.EmployeeService;
import com.ems.service.FinanceService;
import com.ems.service.ProfessionalDetailsService;
import com.ems.service.ProjectService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private ProfessionalDetailsService professionalDetailsService;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private FinanceService financeService;

    // ✅ TEST ENDPOINT (IMPORTANT)
    @GetMapping("/ping")
    public String ping() {
        return "Employee API is working";
    }

    // ✅ Create Employee
    @PostMapping
    public ResponseEntity<String> createEmployee(@RequestBody EmployeeDTO employeeDTO) {

        Employee employee = employeeService.createEmployee(
                employeeDTO.getPersonalDetails()
        );

        professionalDetailsService.saveProfessionalDetails(
                employeeDTO.getProfessionalDetails(employee)
        );

        projectService.saveProjectDetails(
                employeeDTO.getProjectDetails(employee)
        );

        financeService.saveFinanceDetails(
                employeeDTO.getFinanceDetails(employee)
        );

        return ResponseEntity.ok("Employee created successfully!");
    }

    // ✅ Get All Employees
    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    // ✅ Get Employee by ID
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getEmployeeById(id));
    }

    // ✅ Get Professional Details by ID
    @GetMapping("/professional/{profDetailId}")
    public ResponseEntity<ProfessionalDetails> getProfessionalDetails(
            @PathVariable Long profDetailId) {

        return ResponseEntity.ok(
                professionalDetailsService.getprofessionalDetails(profDetailId)
        );
    }

    // ✅ Update Employee
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(
            @PathVariable Long id,
            @RequestBody Employee employee) {

        return ResponseEntity.ok(
                employeeService.updateEmployee(id, employee)
        );
    }

    // ✅ Delete Employee
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.ok(
                "Employee with Id: " + id + " deleted successfully!"
        );
    }
}
