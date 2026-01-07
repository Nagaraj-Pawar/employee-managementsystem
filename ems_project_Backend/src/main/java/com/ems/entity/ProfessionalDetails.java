package com.ems.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "professional_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfessionalDetails {
	  	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long profDetailId;

	    @OneToOne
	    @JoinColumn(name = "employee_id", referencedColumnName = "employeeId")
	    @JsonIgnore
	    private Employee employee;

	    @Column(nullable = true)
	    private String companyEmail;

	    @Column(nullable = false)
	    private String officePhone;

	    @Column(nullable = false)
	    private String officeCity;

	    @Column(nullable = false)
	    private String officeAddress;

	    @Column(nullable = false)
	    private String reportingManager;

	    @Column(nullable = false)
	    private String hrName;

	    @Column(nullable = false)
	    private String dateOfJoining;

}
