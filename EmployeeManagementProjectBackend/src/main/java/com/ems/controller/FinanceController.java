package com.ems.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.ems.entity.FinanceDetails;
import com.ems.repository.EmployeeRepository;
import com.ems.repository.FinanceRepository;

@RestController
@RequestMapping("/finance")
@CrossOrigin(origins = "http://localhost:3000")
public class FinanceController {

    private final FinanceRepository repo;
    private final EmployeeRepository empRepo;

    public FinanceController(FinanceRepository repo,
                             EmployeeRepository empRepo) {
        this.repo = repo;
        this.empRepo = empRepo;
    }

    // ✅ ADMIN – GET ALL FINANCE
    @GetMapping
    public List<FinanceDetails> getAllFinance() {
        return repo.findAll();
    }

    // ✅ ADMIN – ADD FINANCE
    @PostMapping("/{empId}")
    public FinanceDetails addFinance(
            @PathVariable Long empId,
            @RequestBody FinanceDetails finance) {

        finance.setEmployee(empRepo.findById(empId).orElseThrow());
        return repo.save(finance);
    }

    // ✅ ADMIN – UPDATE FINANCE
    @PutMapping("/{id}")
    public FinanceDetails updateFinance(
            @PathVariable Long id,
            @RequestBody FinanceDetails updated) {

        FinanceDetails existing = repo.findById(id).orElseThrow();

        existing.setBankName(updated.getBankName());
        existing.setAccountNumber(updated.getAccountNumber());
        existing.setIfscCode(updated.getIfscCode());
        existing.setBasicSalary(updated.getBasicSalary());
        existing.setHra(updated.getHra());
        existing.setAllowances(updated.getAllowances());
        existing.setDeductions(updated.getDeductions());
        existing.setNetSalary(updated.getNetSalary());

        return repo.save(existing);
    }

    // ✅ ADMIN – DELETE FINANCE
    @DeleteMapping("/{id}")
    public void deleteFinance(@PathVariable Long id) {
        repo.deleteById(id);
    }

    // ✅ EMPLOYEE – GET OWN FINANCE
    @GetMapping("/employee/{empId}")
    public FinanceDetails getByEmployee(@PathVariable Long empId) {
        return repo.findByEmployeeId(empId);
    }
}
