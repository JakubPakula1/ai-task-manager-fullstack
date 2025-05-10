package com.github.jakubpakula1.aitaskmanager.backend.model;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "tasks")
@Getter
@Setter
@Builder
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    private Status status;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public Task(){
    }

    public Task(LocalDateTime updatedAt, LocalDateTime createdAt, Status status, String description, String title, Long id, User user) {
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
        this.status = status;
        this.description = description;
        this.title = title;
        this.id = id;
        this.user = user;
    }

    @PrePersist
    protected void onCreate(){
        createdAt = LocalDateTime.now();
        updatedAt = createdAt;
    }

    @PreUpdate
    protected void onUpdate(){
        updatedAt = LocalDateTime.now();
    }

    public enum Status{
        TODO,
        IN_PROGRESS,
        DONE,
        CANCELED
    }
}
