package com.ems.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String projectName;
    private String projectCode;
    private String clientName;
    private String projectRole;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status; // ONGOING / COMPLETED

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;
}
