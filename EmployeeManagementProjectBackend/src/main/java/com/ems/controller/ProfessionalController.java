package com.ems.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ems.entity.ProfessionalDetails;
import com.ems.repository.ProfessionalRepository;
import com.ems.repository.EmployeeRepository;

@RestController
@RequestMapping("/professional")
@CrossOrigin(origins = "http://localhost:3000")
public class ProfessionalController {

    @Autowired
    private ProfessionalRepository repo;

    @Autowired
    private EmployeeRepository empRepo;

    // ✅ ADMIN – ADD PROFESSIONAL DETAILS
    @PostMapping("/{empId}")
    public ProfessionalDetails add(
            @PathVariable Long empId,
            @RequestBody ProfessionalDetails p) {

        p.setEmployee(empRepo.findById(empId).orElseThrow());
        return repo.save(p);
    }

    // ✅ ADMIN – UPDATE PROFESSIONAL DETAILS
    @PutMapping("/{id}")
    public ProfessionalDetails update(
            @PathVariable Long id,
            @RequestBody ProfessionalDetails updated) {

        ProfessionalDetails existing = repo.findById(id).orElseThrow();

        existing.setQualification(updated.getQualification());
        existing.setSkills(updated.getSkills());
        existing.setExperience(updated.getExperience());
        existing.setPreviousCompany(updated.getPreviousCompany());

        return repo.save(existing);
    }

    // ✅ ADMIN – DELETE PROFESSIONAL DETAILS
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }

    // ✅ EMPLOYEE – VIEW OWN PROFESSIONAL DETAILS
    @GetMapping("/employee/{empId}")
    public ProfessionalDetails getByEmployee(@PathVariable Long empId) {
        return repo.findByEmployee_Id(empId).orElse(null);
    }

    // ✅ ADMIN – GET ALL PROFESSIONAL DETAILS
    @GetMapping
    public List<ProfessionalDetails> getAll() {
        return repo.findAll();
    }
}
