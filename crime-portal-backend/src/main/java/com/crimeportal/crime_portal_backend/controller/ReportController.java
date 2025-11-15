package com.crimeportal.crime_portal_backend.controller;

import com.crimeportal.crime_portal_backend.model.Report;
import com.crimeportal.crime_portal_backend.service.ReportService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:3000")
public class ReportController {
    private final ReportService service;

    public ReportController(ReportService service) {
        this.service = service;
    }

    @GetMapping
    public List<Report> all() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Report> one(@PathVariable Long id) {
        return ResponseEntity.ok(service.get(id));
    }

    @PostMapping
    public ResponseEntity<Report> create(@RequestBody Report r) {
        return ResponseEntity.ok(service.create(r));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Report> update(@PathVariable Long id, @RequestBody Report r) {
        return ResponseEntity.ok(service.update(id, r));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/by-email/{email}")
    public List<Report> byEmail(@PathVariable String email) {
        return service.byUserEmail(email);
    }

    @GetMapping("/by-status/{status}")
    public List<Report> byStatus(@PathVariable String status) {
        return service.byStatus(status);
    }

    @GetMapping("/by-handled/{officerEmail}")
    public List<Report> byHandled(@PathVariable String officerEmail) {
        return service.byHandledBy(officerEmail);
    }

}