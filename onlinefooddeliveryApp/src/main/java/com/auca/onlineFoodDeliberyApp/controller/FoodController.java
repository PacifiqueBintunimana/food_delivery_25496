package com.auca.onlineFoodDeliberyApp.controller;

import com.auca.onlineFoodDeliberyApp.model.Food;
import com.auca.onlineFoodDeliberyApp.service.FoodService;
import com.auca.onlineFoodDeliberyApp.service.NotificationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/manager")
public class FoodController {


    private static final Logger logger = LoggerFactory.getLogger(FoodController.class);

    private final FoodService foodService;
    private final NotificationService notificationService;

    @Autowired
    public FoodController(FoodService foodService, NotificationService notificationService) {
        this.foodService = foodService;
        this.notificationService = notificationService;
    }

    @GetMapping("/food")
    public ResponseEntity<List<Food>> getAllFood() {
        try {
            List<Food> foods = foodService.getAllFood();
            return ResponseEntity.ok(foods);
        } catch (Exception e) {
            logger.error("Error fetching foods", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/food")
    public ResponseEntity<?> postfood(@RequestBody Food food) {
        try {
            logger.info("Received foods: {}", food);

            // Validate required fields
            if (food.getName() == null || food.getDescription() == null || food.getRestaurant() == null || food.getFoodType() == null) {
                logger.error("Missing required food fields");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing required food fields.");
            }

            if (food.getRead() == null) {
                food.setRead(false); // Default value for isRead
            }

            logger.info("Posting new food: {}", food.getName());
            Food createdFood = foodService.saveFood(food);

            notificationService.createNotification("A new food has been posted: " + food.getName());
            logger.info("Food posted successfully: {}", createdFood);

            return ResponseEntity.status(HttpStatus.CREATED).body(createdFood);
        } catch (Exception e) {
            logger.error("Error posting food: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error posting Food: " + e.getMessage());
        }
    }




    @PutMapping("/food/{id}")
    public ResponseEntity<Food> updateFood(@PathVariable Long id, @RequestBody Food food) {
        try {
            Food existingFood = foodService.getFoodById(id);
            if (existingFood == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            food.setId(id);
            Food updatedFood = foodService.saveFood(food);
            return ResponseEntity.ok(updatedFood);
        } catch (Exception e) {
            logger.error("Error updating food", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/Food/{id}")
    public ResponseEntity<?> deleteFood(@PathVariable Long id) {
        try {
            Food food = foodService.getFoodById(id);
            if (food == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("food not found.");
            }

            foodService.deleteFood(id);
            return ResponseEntity.ok("food deleted successfully.");
        } catch (Exception e) {
            logger.error("Error deleting food", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete food: " + e.getMessage());
        }
    }
}
