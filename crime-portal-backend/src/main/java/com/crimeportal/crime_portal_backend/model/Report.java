package com.crimeportal.crime_portal_backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reports")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // Reporter info
    private String userEmail;
    private String userPhone;

    // Content
    @Column(columnDefinition = "TEXT")
    private String body;

    private String category;   // title/category
    private String date;       // e.g., "2025-11-12"
    private String time;       // e.g., "14:30"
    private String location;

    // Workflow
    private String status;     // Open/In Progress/Closed
    private Integer score;     // priority/score metric
    private String handledBy;  // officer email

    // Audit
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
        updatedAt = createdAt;
        if (status == null || status.isBlank()) status = "Open";
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }
}