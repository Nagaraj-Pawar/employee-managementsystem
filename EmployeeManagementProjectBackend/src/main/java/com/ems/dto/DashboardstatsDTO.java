package com.ems.dto;

import lombok.Data;

@Data
public class DashboardStatsDTO {
    private long totalEmployees;
    private long totalProjects;
    private double totalSalaryPaid;
}
