package com.ems.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ems.entity.Employee;
import com.ems.repository.EmployeeRepository;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    private final EmployeeRepository repo;

    public AdminController(EmployeeRepository repo) {
        this.repo = repo;
    }

    // ✅ ADD employee
    @PostMapping("/employee")
    public Employee addEmployee(@RequestBody Employee employee) {
        return repo.save(employee);
    }

    // ✅ GET all employees
    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return repo.findAll();
    }

    // ✅ GET employee by id
    @GetMapping("/employee/{id}")
    public Employee getEmployee(@PathVariable Long id) {
        return repo.findById(id).orElseThrow();
    }

    // ✅ UPDATE employee
    @PutMapping("/employee/{id}")
    public Employee updateEmployee(
            @PathVariable Long id,
            @RequestBody Employee updated) {

        Employee emp = repo.findById(id).orElseThrow();

        emp.setName(updated.getName());
        emp.setEmail(updated.getEmail());
        emp.setDepartment(updated.getDepartment());
        emp.setRole(updated.getRole());
        emp.setPhone(updated.getPhone());

        return repo.save(emp);
    }

    // ✅ DELETE employee
    @DeleteMapping("/employee/{id}")
    public void deleteEmployee(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
