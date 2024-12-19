package com.auca.onlineFoodDeliberyApp.controller;

import com.auca.onlineFoodDeliberyApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class PasswordResetController {
/*
    @Autowired
    private UserService userService;

    @PostMapping("/auth/forgotPassword")
    public ResponseEntity<?> handleForgotPassword(@RequestParam("email") String email) {
        Map<String, String> response = new HashMap<>();

        if (!userService.doesEmailExist(email)) {
            response.put("error", "Email address not found.");
            return ResponseEntity.badRequest().body(response);
        }

        userService.deleteExistingResetTokenByEmail(email);
        boolean emailSent = userService.sendPasswordResetEmail(email);

        if (emailSent) {
            response.put("message", "A reset link has been sent to your email.");
            return ResponseEntity.ok(response);
        } else {
            response.put("error", "Failed to send email. Please try again.");
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/auth/validate-reset-token")
    public ResponseEntity<?> validateResetToken(@RequestParam("token") String token) {
        Map<String, String> response = new HashMap<>();

        if (token == null) {
            response.put("error", "Token is missing.");
            return ResponseEntity.badRequest().body(response);
        }

        boolean isValidToken = userService.validatePasswordResetToken(token);
        if (!isValidToken) {
            response.put("error", "Invalid or expired token.");
            return ResponseEntity.badRequest().body(response);
        }

        response.put("message", "Token is valid");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/auth/resetPassword/{token}")
    public ResponseEntity<?> handlePasswordReset(@PathVariable String token, @RequestBody Map<String, String> request) {
        String newPassword = request.get("newPassword");
        String confirmNewPassword = request.get("confirmNewPassword"); // Remove space
        Map<String, String> response = new HashMap<>();

        if (!newPassword.equals(confirmNewPassword)) {
            response.put("error", "Passwords do not match. Please try again.");
            return ResponseEntity.badRequest().body(response);
        }

        boolean isResetSuccessful = userService.resetUserPassword(token, newPassword);

        if (isResetSuccessful) {
            response.put("message", "Your password has been successfully reset. You can now log in.");
            return ResponseEntity.ok(response);
        } else {
            response.put("error", "Failed to reset password. Please try again.");
            return ResponseEntity.badRequest().body(response);
        }
    }
*/
@Autowired
private UserService userService;

    /**
     * Handle forgot password request
     *
     * @param payload contains the email address
     * @return response indicating success or failure
     */
    @PostMapping("/forgot-password")
    public ResponseEntity<?> handleForgotPassword(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email is required."));
        }

        if (!userService.doesEmailExist(email)) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email address not found."));
        }

        userService.deleteExistingResetTokenByEmail(email);
        boolean emailSent = userService.sendPasswordResetEmail(email);

        return emailSent
                ? ResponseEntity.ok(Map.of("message", "A reset link has been sent to your email."))
                : ResponseEntity.badRequest().body(Map.of("error", "Failed to send email. Please try again."));
    }

    /**
     * Validate the reset token
     *
     * @param token the password reset token
     * @return response indicating if the token is valid
     */
    @GetMapping("/reset-password")
    public ResponseEntity<?> validateResetToken(@RequestParam("token") String token) {
        boolean isValidToken = userService.validatePasswordResetToken(token);

        if (!isValidToken) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid or expired password reset token."));
        }

        return ResponseEntity.ok(Map.of("message", "Token is valid."));
    }

    /**
     * Handle password reset request
     *
     * @param payload contains the token, newPassword, and confirmNewPassword
     * @return response indicating success or failure
     */
    @PostMapping("/reset-password")
    public ResponseEntity<?> handlePasswordReset(@RequestBody Map<String, String> payload) {
        String token = payload.get("token");
        String newPassword = payload.get("newPassword");
        String confirmNewPassword = payload.get("confirmNewPassword");

        if (token == null || token.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Token is required."));
        }

        if (newPassword == null || confirmNewPassword == null || newPassword.isEmpty() || confirmNewPassword.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Password fields cannot be empty."));
        }

        if (!newPassword.equals(confirmNewPassword)) {
            return ResponseEntity.badRequest().body(Map.of("error", "Passwords do not match."));
        }

        boolean isResetSuccessful = userService.resetUserPassword(token, newPassword);

        return isResetSuccessful
                ? ResponseEntity.ok(Map.of("message", "Your password has been successfully reset."))
                : ResponseEntity.badRequest().body(Map.of("error", "Failed to reset password. Please try again."));
    }

}
