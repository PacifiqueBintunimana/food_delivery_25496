package com.auca.onlineFoodDeliberyApp.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String action; // e.g., "LOGIN", "LOGOUT", "REGISTER", etc.
    private String username; // The user performing the action
    @Column(name = "timestamp")
    private LocalDateTime timestamp; // When the action occurred
    private String details; // Additional details about the action

    // Constructors, Getters, Setters
    public AuditLog() {
    }

    public AuditLog(String action, String username, LocalDateTime timestamp, String details) {
        this.action = action;
        this.username = username;
        this.timestamp = timestamp;
        this.details = details;
    }

    // Getters and setters ...

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }/*
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

    @Column(name = "action_type")
    private String actionType;

    @Column(name = "user_id")
    private Long userId;  // ID of the affected user

    @Column(name = "changed_by")
    private String changedBy;  // The user performing the action

    @Column(name = "timestamp")
    private LocalDateTime timestamp;  // Timestamp of the action

    @Column(name = "details")
    private String details;  // Details about the action (e.g., what was changed)

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getActionType() {
        return actionType;
    }

    public void setActionType(String actionType) {
        this.actionType = actionType;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getChangedBy() {
        return changedBy;
    }

    public void setChangedBy(String changedBy) {
        this.changedBy = changedBy;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }
*/
}