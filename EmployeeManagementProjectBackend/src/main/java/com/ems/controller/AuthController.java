package com.ems.controller;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ems.entity.Employee;
import com.ems.repository.EmployeeRepository;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @PostMapping
    public Employee login(@RequestBody Employee request) {

        Optional<Employee> empOpt =
                employeeRepository.findByEmailAndPassword(
                        request.getEmail(),
                        request.getPassword()
                );

        if (empOpt.isEmpty()) {
            throw new RuntimeException("Invalid email or password");
        }

        return empOpt.get();
    }
}
