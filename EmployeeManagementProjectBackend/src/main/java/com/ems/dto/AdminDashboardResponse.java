package com.ems.dto;

import java.util.List;
import lombok.Data;

@Data
public class AdminDashboardResponse {

    private DashboardStatsDTO stats;
    private List<EmployeeDashboardDTO> employees;
}
