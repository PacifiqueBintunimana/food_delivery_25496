package com.auca.onlineFoodDeliberyApp.service;

import com.auca.onlineFoodDeliberyApp.model.Food;
import com.auca.onlineFoodDeliberyApp.repository.FoodRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class FoodService {

    private final FoodRepository foodRepository;

    public FoodService(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    // Save or update
    public Food saveFood(Food food) {
        return foodRepository.save(food);
    }

    // Get all
    public List<Food> getAllFood() {
        return foodRepository.findAll();
    }

    // Get a  by ID
    public Food getFoodById(Long id) {
        Optional<Food> job = foodRepository.findById(id);
        return job.orElse(null);  // Return null if not found
    }

    // Delete a  by ID
    public void deleteFood(Long id) {
        foodRepository.deleteById(id);
    }

}
