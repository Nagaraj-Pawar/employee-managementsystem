package com.ems.controller;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.*;

import com.ems.dto.AdminDashboardResponse;
import com.ems.dto.EmployeeDashboardDTO;
import com.ems.entity.Employee;
import com.ems.repository.EmployeeRepository;
import com.ems.repository.FinanceRepository;
import com.ems.repository.ProjectRepository;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {

    private final EmployeeRepository empRepo;
    private final ProjectRepository projRepo;
    private final FinanceRepository finRepo;

    public DashboardController(EmployeeRepository empRepo,
                               ProjectRepository projRepo,
                               FinanceRepository finRepo) {
        this.empRepo = empRepo;
        this.projRepo = projRepo;
        this.finRepo = finRepo;
    }

    // 🔥 ADMIN DASHBOARD – ALL DETAILS
    @GetMapping("/admin")
    public AdminDashboardResponse adminDashboard() {

        // ===== DASHBOARD STATS =====
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalEmployees", empRepo.count());
        stats.put("totalProjects", projRepo.count());

        Double salary = finRepo.totalSalaryPaid();
        stats.put("totalSalaryPaid", salary != null ? salary : 0);

        // ===== EMPLOYEE DETAILS =====
        List<EmployeeDashboardDTO> employees =
                empRepo.findAll()
                       .stream()
                       .map(emp -> {
                           EmployeeDashboardDTO dto =
                                   new EmployeeDashboardDTO(emp);

                           dto.setProjects(
                                   projRepo.findByEmployeeId(emp.getId())
                           );

                           dto.setFinance(
                                   finRepo.findByEmployeeId(emp.getId())
                           );

                           return dto;
                       })
                       .collect(Collectors.toList());

        AdminDashboardResponse response = new AdminDashboardResponse();
        response.setStats(stats);
        response.setEmployees(employees);

        return response;
    }

    // 📊 OPTIONAL: SEPARATE STATS ENDPOINT
    @GetMapping("/stats")
    public Map<String, Object> dashboardStats() {

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalEmployees", empRepo.count());
        stats.put("totalProjects", projRepo.count());

        Double salary = finRepo.totalSalaryPaid();
        stats.put("totalSalaryPaid", salary != null ? salary : 0);

        return stats;
    }
}
