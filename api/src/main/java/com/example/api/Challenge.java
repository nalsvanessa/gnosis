package com.example.api;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;


@Entity
@Table(name = "challenges") // Maps this class to the 'challenges' table
public class Challenge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private short id;
    @NotNull 
    private String title;
    @NotNull
    private String difficulty;
    @NotNull
    private String description;
    @NotNull
    private String category;
    @Column(name = "created_at")
    private LocalDate createdAt;
    private String reflection;
    private boolean completed;
    @Column(name = "completed_at")
    private LocalDate completedAt;

    // JPA requires a default, no-argument constructor
    public Challenge() {
    }

    // Getters and Setters
    public short getId() {
        return id;
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

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt ;
    }

    public java.time.LocalDate getCreatedAt() {
        return createdAt;
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
    
    public void setCompletedAt(LocalDate completedAt) {
        this.completedAt = completedAt;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
       this.difficulty = difficulty;
}








}

