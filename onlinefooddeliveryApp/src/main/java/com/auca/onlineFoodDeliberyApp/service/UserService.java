package com.auca.onlineFoodDeliberyApp.service;

import com.auca.onlineFoodDeliberyApp.model.ResetToken;
import com.auca.onlineFoodDeliberyApp.model.Role;
import com.auca.onlineFoodDeliberyApp.model.User;
import com.auca.onlineFoodDeliberyApp.model.UserDTO;
import com.auca.onlineFoodDeliberyApp.repository.ResetTokenRepository;
import com.auca.onlineFoodDeliberyApp.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ResetTokenRepository resetTokenRepository;

    @Autowired
    private JavaMailSender mailSender;
    @PostConstruct
    public void init() {
        addAdminUser(); // Automatically add the admin user on application startup
    }


    public Map<String, Object> getDashboardStatistics() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("activeUsers", userRepository.countByStatus("ACTIVE"));
        stats.put("customerCount", userRepository.countByRole(Role.ROLE_USER));
        stats.put("managerCount", userRepository.countByRole(Role.ROLE_MANAGER));
        return stats;
    }

   /* @Transactional
    public boolean sendPasswordResetEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return false;
        }

        deleteExistingResetTokenByEmail(email);

        String token = UUID.randomUUID().toString();
        saveResetTokenForUser(user, token);

        String resetLink = "http://localhost:3000/resetPassword/" + token;
        String emailContent = """
            <html>
                <body style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2 style="color: #2575fc;">Password Reset Request</h2>
                    <p>Hello %s,</p>
                    <p>We received a request to reset your password. Click the button below to proceed:</p>
                    <a href="%s" style="background-color: #2575fc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0;">Reset Password</a>
                    <p>This link will expire in 15 minutes.</p>
                    <p>If you didn't request this, please ignore this email.</p>
                    <p>Best regards,<br>Your Application Team</p>
                </body>
            </html>
        """.formatted(user.getUsername(), resetLink);

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(email);
            helper.setSubject("Password Reset Request");
            helper.setText(emailContent, true);
            mailSender.send(message);
            return true;
        } catch (Exception e) {
            System.out.println("Failed to send email: " + e.getMessage());
            return false;
        }
    }
*/
   @Transactional // Ensure transactional context
   public boolean sendPasswordResetEmail(String email) {
       User user = userRepository.findByEmail(email);
       if (user == null) {
           return false; // User not found
       }

       // Delete any existing reset token for this user before generating a new one
       deleteExistingResetTokenByEmail(email);

       // Generate a new token and save it
       String token = UUID.randomUUID().toString();
       saveResetTokenForUser(user, token);

       // Prepare and send email
       String resetUrl = "http://localhost:5173/reset-password?token=" + token;
       String message = "To reset your password, click the link below:\n" + resetUrl;

       // Use the sendEmail method for email dispatching
       sendEmail(email, "Password Reset", message);

       return true;
   }
    @Transactional
    public void saveResetTokenForUser(User user, String token) {
        ResetToken resetToken = new ResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpiryDate(LocalDateTime.now().plusMinutes(15));
        resetTokenRepository.save(resetToken);
    }
    //add
    private void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        message.setFrom("iradukundakevine112@gmail.com"); // Set sender's email address explicitly

        mailSender.send(message);  // Send the email
    }


    @Transactional
    public void deleteExistingResetTokenByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            resetTokenRepository.findByUser(user).ifPresent(resetToken -> {
                resetTokenRepository.delete(resetToken);
                System.out.println("Deleted existing token: " + resetToken.getToken());
            });
        }
    }

    public boolean doesEmailExist(String email) {
        return userRepository.findByEmail(email) != null;
    }

    @Transactional
    public User registerUser(User user) {
        return userRepository.save(user);
    }

    public User loginUser(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<User> findUserByResetToken(String token) {
        return resetTokenRepository.findByToken(token)
                .map(ResetToken::getUser);
    }

    public boolean validatePasswordResetToken(String token) {
        Optional<ResetToken> resetTokenOptional = resetTokenRepository.findByToken(token);
        if (resetTokenOptional.isPresent()) {
            ResetToken resetToken = resetTokenOptional.get();
            boolean isValid = resetToken.getExpiryDate().isAfter(LocalDateTime.now());
            System.out.println("Token: " + token + ", Valid: " + isValid);
            return isValid;
        }
        System.out.println("Token: " + token + " not found.");
        return false;
    }
/*
    @Transactional
    public boolean resetUserPassword(String token, String newPassword) {
        if (!validatePasswordResetToken(token)) {
            System.out.println("Invalid or expired token: " + token);
            return false;
        }

        Optional<User> userOptional = findUserByResetToken(token);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword(newPassword);
            userRepository.save(user);
            resetTokenRepository.deleteByToken(token);
            return true;
        }
        System.out.println("No user found for the token: " + token);
        return false;
    }*/
    //add
@Transactional // Ensure transactional context
public boolean resetUserPassword(String token, String newPassword) {
    // Validate the token
    if (!validatePasswordResetToken(token)) {
        System.out.println("Invalid or expired token: " + token);
        return false; // Token is invalid or expired
    }

    // Find the user associated with the token
    Optional<User> userOptional = findUserByResetToken(token);
    if (!userOptional.isPresent()) {
        System.out.println("No user found for the token: " + token);
        return false;
    }

    User user = userOptional.get();
    user.setPassword(newPassword); // Update the user's password
    userRepository.save(user);

    // Invalidate the token after successful password reset
    resetTokenRepository.deleteByToken(token);

    return true;
}
    @Transactional // Ensure transactional context
    public void updateUser(User user) {
        userRepository.save(user); // Save the updated user
    }

    @Transactional // Ensure transactional context
    public void deleteUser(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            userRepository.deleteById(id);
            System.out.println("User with ID " + id + " deleted successfully.");
        } else {
            System.out.println("User with ID " + id + " not found.");
        }
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /*public void addAdminUser() {
        if (userRepository.findByUsername("admin") == null) {
            User adminUser = new User();
            adminUser.setUsername("admin");
            adminUser.setPassword("12345");
            adminUser.setEmail("bintunimana.pacifique@gmail.com");
            adminUser.setRole(Role.ROLE_ADMIN);
            userRepository.save(adminUser);
            System.out.println("Admin user created successfully.");
        } else {
            System.out.println("Admin user already exists.");
        }
    }
*/
    @Transactional
    public User createUser(UserDTO userDTO) {
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setPassword(userDTO.getPassword());
        user.setEmail(userDTO.getEmail());
        user.setPhoneNumber(userDTO.getPoneNumber());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());

        user.setRole(Role.valueOf(userDTO.getRole()));
        user.setStatus("ACTIVE");
        return userRepository.save(user);
    }

    @Transactional
    public User updateUser(UserDTO userDTO) {
        User user = userRepository.findById(userDTO.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setRole(Role.valueOf(userDTO.getRole()));
        if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
            user.setPassword(userDTO.getPassword());
        }
        return userRepository.save(user);
    }

   /* @Transactional
    public void deleteUser(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            userRepository.deleteById(id);
            System.out.println("User with ID " + id + " deleted successfully.");
        } else {
            System.out.println("User with ID " + id + " not found.");
        }
    }
*/
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public List<User> searchUsers(String username, String email) {
        return userRepository.findByUsernameContainingOrEmailContaining(username, email);
    }

    public Page<User> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    public void processUserUpload(MultipartFile file) throws IOException {
        List<User> users = new ArrayList<>();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            boolean firstLine = true;
            while ((line = reader.readLine()) != null) {
                if (firstLine) {
                    firstLine = false;
                    continue;
                }
                String[] data = line.split(",");
                User user = new User();
                user.setUsername(data[0]);
                user.setEmail(data[1]);
                user.setPassword(data[2]);
                user.setRole(Role.valueOf(data[3]));
                user.setStatus("ACTIVE");
                users.add(user);
            }
        }
        userRepository.saveAll(users);
    }

    public List<User> getUsersByFilterAndDate(String filter, String dateRange) {
        if ("students".equals(filter)) {
            return userRepository.findByRole(Role.ROLE_USER);
        } else if ("teachers".equals(filter)) {
            return userRepository.findByRole(Role.ROLE_MANAGER);
        } else if ("active".equals(filter)) {
            return userRepository.findByStatus("ACTIVE");
        } else if ("inactive".equals(filter)) {
            return userRepository.findByStatus("INACTIVE");
        }
        return userRepository.findAll();
    }

    public void saveAll(List<User> userList) {
        userRepository.saveAll(userList);
    }
    public void addAdminUser() {
        // Check if admin user already exists
        if (userRepository.findByUsername("admin") == null) {
            User adminUser = new User();
            adminUser.setUsername("admin");
            adminUser.setPassword("admin"); // Hash the password
            adminUser.setEmail("pacifique.bintunimana@gmail.com");
            adminUser.setRole(Role.ROLE_ADMIN); // Ensure Role is properly defined

            userRepository.save(adminUser);
            System.out.println("Admin user created successfully.");
        } else {
            System.out.println("Admin user already exists.");
        }
    }

}
