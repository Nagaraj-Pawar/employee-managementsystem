package com.ems.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfessionalDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String qualification;
    private String skills;
    private Integer experience;
    private String previousCompany;

    @OneToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;
}
