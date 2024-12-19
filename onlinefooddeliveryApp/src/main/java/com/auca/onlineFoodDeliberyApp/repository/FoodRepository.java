package com.auca.onlineFoodDeliberyApp.repository;

import com.auca.onlineFoodDeliberyApp.model.Food;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository extends JpaRepository<Food, Long> {
}
