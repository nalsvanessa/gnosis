package com.example.api;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "challenges") // Maps this class to the 'challenges' table
public class Challenge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private short id;
    private String title;
    private String description;
    private String category;
    @Column(name = "created_at")
    private java.time.LocalDate createdAt;
    private String reflection;
    private boolean completed;
    @Column(name = "completed_at")
    private java.time.LocalDate completedAt;

    // JPA requires a default, no-argument constructor
    public Challenge() {
    }

    // Getters and Setters
    public short getId() {
        return id;
    }

    public void setId(short id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public java.time.LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(java.time.LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public String getReflection() {
        return reflection;
    }

    public void setReflection(String reflection) {
        this.reflection = reflection;
    }

    public boolean getCompleted() {
        return completed;
    }
    
    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public java.time.LocalDate getCompletedAt() {
        return completedAt;
    }
    
    public void setCompletedAt(java.time.LocalDate completedAt) {
        this.completedAt = completedAt;
    }








}

