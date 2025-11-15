package com.crimeportal.crime_portal_backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @Column(unique = true)
    private String email;

    // For demo only; use hashing (BCrypt) in real apps
    private String password;

    @Column(length = 20)
    private String phone;

    // CITIZEN / POLICE / MANAGER / ADMIN
    @Column(nullable = false, columnDefinition = "VARCHAR(32) DEFAULT 'CITIZEN'")
    private String role; // default handled at DB level too[1]
    @PrePersist
    public void prePersist() {
        if (role == null || role.isBlank()) {
            role = "CITIZEN"; // service-independent safety net[1]
        }
    }
}