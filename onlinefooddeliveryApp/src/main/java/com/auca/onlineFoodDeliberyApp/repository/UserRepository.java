package com.auca.onlineFoodDeliberyApp.repository;

import com.auca.onlineFoodDeliberyApp.model.Role;
import com.auca.onlineFoodDeliberyApp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
//    static List<User> findByRole(Role role) {
//        return null;
//    }

    User findByUsername(String username);
    User findByEmail(String email);
    List<User> findByUsernameContainingOrEmailContaining(String username, String email);

    long countByStatus(String status);
    long countByRole(Role role);
    List<User> findByStatus(String status);
    List<User> findByRole(Role role);
}