package com.auca.onlineFoodDeliberyApp.repository;

import com.auca.onlineFoodDeliberyApp.model.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {


    List<AuditLog> findByAction(String action);

    List<AuditLog> findByUsername(String username);

    List<AuditLog> findByTimestampBetween(LocalDateTime start, LocalDateTime end);

    List<AuditLog> findByActionAndUsername(String action, String username);

    long countByAction(String action);
//
//    List<AuditLog> findTopNByOrderByTimestampDesc(Integer n);
//
//    @Query("SELECT a FROM AuditLog a ORDER BY a.timestamp DESC")
//    List<AuditLog> findTopNByOrderByTimestampDesc(Pageable pageable);
//
//    Pageable pageable = PageRequest.of(0, N); // N is the number of records you want
//    List<AuditLog> results = auditLogRepository.findTopNByOrderByTimestampDesc(pageable);


}