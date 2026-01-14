package com.ems.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.ems.entity.ProjectDetails;
import com.ems.repository.EmployeeRepository;
import com.ems.repository.ProjectRepository;

@RestController
@RequestMapping("/projects")
@CrossOrigin(origins = "http://localhost:3000")
public class ProjectController {

    private final ProjectRepository repo;
    private final EmployeeRepository empRepo;

    public ProjectController(ProjectRepository repo,
                             EmployeeRepository empRepo) {
        this.repo = repo;
        this.empRepo = empRepo;
    }

    // ✅ ADMIN – GET ALL PROJECTS
    @GetMapping
    public List<ProjectDetails> getAllProjects() {
        return repo.findAll();
    }

    // ✅ ADMIN – ADD PROJECT
    @PostMapping("/{empId}")
    public ProjectDetails addProject(
            @PathVariable Long empId,
            @RequestBody ProjectDetails project) {

        project.setEmployee(empRepo.findById(empId).orElseThrow());
        return repo.save(project);
    }

    // ✅ ADMIN – UPDATE PROJECT
    @PutMapping("/{id}")
    public ProjectDetails updateProject(
            @PathVariable Long id,
            @RequestBody ProjectDetails updated) {

        ProjectDetails existing = repo.findById(id).orElseThrow();

        existing.setProjectName(updated.getProjectName());
        existing.setClientName(updated.getClientName());
        existing.setProjectCode(updated.getProjectCode());
        existing.setProjectRole(updated.getProjectRole());
        existing.setStartDate(updated.getStartDate());
        existing.setEndDate(updated.getEndDate());
        existing.setStatus(updated.getStatus());

        return repo.save(existing);
    }

    // ✅ ADMIN – DELETE PROJECT
    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable Long id) {
        repo.deleteById(id);
    }

    // ✅ EMPLOYEE – GET OWN PROJECTS
    @GetMapping("/employee/{empId}")
    public List<ProjectDetails> getByEmployee(@PathVariable Long empId) {
        return repo.findByEmployeeId(empId);
    }
}
