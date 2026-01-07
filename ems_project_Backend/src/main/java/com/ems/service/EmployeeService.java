package com.ems.service;

import java.util.List;

import com.ems.entity.Employee;

public interface EmployeeService {

	Employee createEmployee(Employee employee);
	
	Employee getEmployeeById(Long employeeId);
	
	List<Employee> getAllEmployees();
	
	Employee updateEmployee(Long employeeId, Employee updateEmployee);
	
	void deleteEmployee(Long employeeId);
	
	//Employee getpersonalDetails(Long employeeId);

}
