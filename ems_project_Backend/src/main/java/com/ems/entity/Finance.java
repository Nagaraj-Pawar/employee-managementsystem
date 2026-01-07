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
@Table(name = "finance")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Finance {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long financeId;

	    @OneToOne
	    @JoinColumn(name = "employee_id", referencedColumnName = "employeeId" )
	    @JsonIgnore
	    private Employee employee;

	    @Column(nullable = false)
	    private String panCard;

	    @Column(nullable = false)
	    private String aadharCard;

	    @Column(nullable = false)
	    private String bankName;

	    @Column(nullable = false)
	    private String branch;

	    @Column(nullable = false)
	    private String ifscCode;

	    @Column(nullable = false)
	    private String ctcBreakup;


}
