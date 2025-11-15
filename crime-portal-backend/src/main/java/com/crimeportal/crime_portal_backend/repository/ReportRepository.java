package com.crimeportal.crime_portal_backend.repository;

import com.crimeportal.crime_portal_backend.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByUserEmail(String userEmail);
    List<Report> findByStatus(String status);
    List<Report> findByHandledBy(String handledBy);
}