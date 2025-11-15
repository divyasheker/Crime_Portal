package com.crimeportal.crime_portal_backend.service;

import com.crimeportal.crime_portal_backend.exception.ResourceNotFoundException;
import com.crimeportal.crime_portal_backend.model.Report;
import com.crimeportal.crime_portal_backend.repository.ReportRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {
    private final ReportRepository repo;

    public ReportService(ReportRepository repo) {
        this.repo = repo;
    }

    public List<Report> getAll() {
        return repo.findAll();
    }

    public Report get(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Report not found with id " + id));
    }

    public Report create(Report r) {
        return repo.save(r);
    }

    public Report update(Long id, Report u) {
        Report r = get(id);
        r.setUserEmail(u.getUserEmail());
        r.setUserPhone(u.getUserPhone());
        r.setBody(u.getBody());
        r.setCategory(u.getCategory());
        r.setDate(u.getDate());
        r.setTime(u.getTime());
        r.setLocation(u.getLocation());
        r.setStatus(u.getStatus());
        r.setScore(u.getScore());
        r.setHandledBy(u.getHandledBy());
        return repo.save(r);
    }

    public void delete(Long id) {
        repo.delete(get(id));
    }

    public List<Report> byUserEmail(String email) {
        return repo.findByUserEmail(email);
    }

    public List<Report> byStatus(String status) {
        return repo.findByStatus(status);
    }

    public List<Report> byHandledBy(String officerEmail) {
        return repo.findByHandledBy(officerEmail);
    }
}