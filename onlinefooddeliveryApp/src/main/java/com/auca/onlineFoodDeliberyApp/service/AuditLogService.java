package com.auca.onlineFoodDeliberyApp.service;

import com.auca.onlineFoodDeliberyApp.model.AuditLog;
import com.auca.onlineFoodDeliberyApp.repository.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AuditLogService {

    @Autowired
    private AuditLogRepository auditLogRepository;

    public void logAction(String action, String username, String details) {
        AuditLog logEntry = new AuditLog(action, username, LocalDateTime.now(), details);
        auditLogRepository.save(logEntry);
    }

    public List<AuditLog> getLogsByAction(String action) {
        return auditLogRepository.findByAction(action);
    }

    public List<AuditLog> getUserLogs(String username) {
        return auditLogRepository.findByUsername(username);
    }

    public List<AuditLog> getLogsBetweenDates(LocalDateTime start, LocalDateTime end) {
        return auditLogRepository.findByTimestampBetween(start, end);
    }

    public long getCountByAction(String action) {
        return auditLogRepository.countByAction(action);
    }
}