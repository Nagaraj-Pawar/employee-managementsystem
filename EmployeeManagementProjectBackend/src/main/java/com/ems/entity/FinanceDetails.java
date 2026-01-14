package com.ems.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FinanceDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bankName;
    private String accountNumber;
    private String ifscCode;
    private Double basicSalary;
    private Double hra;
    private Double allowances;
    private Double deductions;
    private Double netSalary;

    @OneToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;
}
