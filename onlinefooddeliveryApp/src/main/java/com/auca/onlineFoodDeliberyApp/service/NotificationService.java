package com.auca.onlineFoodDeliberyApp.service;

import com.auca.onlineFoodDeliberyApp.model.Notification;
import com.auca.onlineFoodDeliberyApp.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {
/*
    @Autowired
    private NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public List<Notification> getUnreadNotifications(Long userId) {
        return notificationRepository.findByIsReadFalse();
    }

    public void sendNotification(String title, String message) {
        Notification notification = new Notification();
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setTimestamp(LocalDateTime.now());
        notification.setRead(false);
        notificationRepository.save(notification);
    }

    public void markAsRead(Long notificationId) {
        Optional<Notification> notification = notificationRepository.findById(notificationId);
        notification.ifPresent(notif -> {
            notif.setRead(true);
            notificationRepository.save(notif);
        });
    }
    @Transactional
    public void markAllAsRead(Long id) {
        notificationRepository.markAllAsRead();
    }

*/


    private final NotificationRepository notificationRepository;

    @Autowired
    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    // Method to create and save a notification
    public Notification createNotification(String message) {
        Notification notification = new Notification(message);
        return notificationRepository.save(notification);  // Save notification to DB
    }

    // Method to retrieve all notifications for the admin
    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();  // Fetch all notifications
    }

    // Mark notification as read
    public void markAsRead(Long id) {
        Optional<Notification> notificationOpt = notificationRepository.findById(id);
        notificationOpt.ifPresent(notification -> {
            notification.setIsRead(true);
            notificationRepository.save(notification);
        });
    }

    // Clear all notifications
    public void clearAllNotifications() {
        notificationRepository.deleteAll();  // Clear all notifications from the DB
    }
    public List<Notification> getUnreadNotifications(Long userId) {
        return notificationRepository.findByIsReadFalse();
    }

    @Transactional
    public void markAllAsRead(Long id) {
        notificationRepository.markAllAsRead();
    }

}