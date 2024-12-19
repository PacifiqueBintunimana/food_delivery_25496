package com.auca.onlineFoodDeliberyApp.controller;

import com.auca.onlineFoodDeliberyApp.model.Notification;
//import com.auca.onlineFoodDeliberyApp.model.QuizResult;
import com.auca.onlineFoodDeliberyApp.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@CrossOrigin(origins = "http://localhost:3000")
//@RequestMapping("/api/admin")
@RequestMapping("/api/notifications")


public class NotificationController {
/*
    @Autowired
    private NotificationService notificationService;
    private Notification user;

    // This endpoint matches the frontend request to /api/admin/notifications
    @GetMapping("/notifications")
    public ResponseEntity<List<Notification>> getAllNotifications() {
        return ResponseEntity.ok().build();
    }

    @GetMapping("/notifications/unread")
    public ResponseEntity<List<Notification>> getUnreadNotifications() {
        return ResponseEntity.ok(notificationService.getUnreadNotifications(user.getId()));
    }

    @PostMapping("/notifications/send")
    public ResponseEntity<?> sendNotification(@RequestParam String title, @RequestParam String message) {
        notificationService.sendNotification(title, message);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/notifications/{id}/mark-read")
    public ResponseEntity<?> markAsRead(@PathVariable Long id) {
        notificationService.markAsRead(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/notifications/mark-all-read")
    public ResponseEntity<?> markAllAsRead() {
        notificationService.markAllAsRead(user.getId());
        return ResponseEntity.ok().build();
    }

 */

private final NotificationService notificationService;
//private final Notification user;
@Autowired
public NotificationController(NotificationService notificationService
                             // Notification user
) {
    this.notificationService = notificationService;
   // this.user =user;
}

    // Endpoint to create a new notification
    @PostMapping
    public ResponseEntity<Notification> createNotification(@RequestParam String message) {
        Notification notification = notificationService.createNotification(message);
        return new ResponseEntity<>(notification, HttpStatus.CREATED);
    }

    // Endpoint to get all notifications
    @GetMapping
    public ResponseEntity<List<Notification>> getAllNotifications() {
        List<Notification> notifications = notificationService.getAllNotifications();
        return new ResponseEntity<>(notifications, HttpStatus.OK);
    }

    // Endpoint to mark a notification as read
    @PatchMapping("/{id}/read")
    public ResponseEntity<Void> markAsRead(@PathVariable Long id) {
        notificationService.markAsRead(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Endpoint to clear all notifications
    @DeleteMapping
    public ResponseEntity<Void> clearAllNotifications() {
        notificationService.clearAllNotifications();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);


}


  //  @PutMapping("/notifications/mark-all-read")
   // public ResponseEntity<?> markAllAsRead() {
        //notificationService.markAllAsRead(user.getId());
      //  return ResponseEntity.ok().build();
   // }


}

