package com.ems.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ems.entity.Employee;
import com.ems.exception.ResourceNotFoundException;
import com.ems.repository.EmployeeRepository;

@Service
@Transactional   // 🔥 VERY IMPORTANT
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public Employee createEmployee(Employee employee) {

        // 🔥 ENSURE NEW ENTITY
        employee.setEmployeeId(null);

        Employee savedEmployee = employeeRepository.save(employee);
        System.out.println("Employee saved with ID: " + savedEmployee.getEmployeeId());

        return savedEmployee;
    }

    @Override
    public Employee getEmployeeById(Long employeeId) {
        return employeeRepository.findById(employeeId)
            .orElseThrow(() ->
                new ResourceNotFoundException("Employee not found with ID: " + employeeId));
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee updateEmployee(Long employeeId, Employee updatedEmployee) {

        Employee emp = employeeRepository.findById(employeeId)
            .orElseThrow(() ->
                new ResourceNotFoundException("Employee not found with ID: " + employeeId));

        emp.setFullName(updatedEmployee.getFullName());
        emp.setDateOfBirth(updatedEmployee.getDateOfBirth());
        emp.setGender(updatedEmployee.getGender());
        emp.setAge(updatedEmployee.getAge());
        emp.setCurrentAddress(updatedEmployee.getCurrentAddress());
        emp.setPermanentAddress(updatedEmployee.getPermanentAddress());
        emp.setMobile(updatedEmployee.getMobile());
        emp.setCompanyemail(updatedEmployee.getCompanyemail());
        emp.setPersonalEmail(updatedEmployee.getPersonalEmail());

        return employeeRepository.save(emp);
    }

    @Override
    public void deleteEmployee(Long employeeId) {

        Employee employee = employeeRepository.findById(employeeId)
            .orElseThrow(() ->
                new ResourceNotFoundException("Employee not found with ID: " + employeeId));

        employeeRepository.delete(employee);
    }

    public Employee getPersonalDetails(Long employeeId) {
        return employeeRepository.findById(employeeId)
            .orElseThrow(() ->
                new ResourceNotFoundException("Employee not found with ID: " + employeeId));
    }
}
