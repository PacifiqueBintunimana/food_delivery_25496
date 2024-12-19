package com.auca.onlineFoodDeliberyApp.controller;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")  // Changed from "/api/**" to "/**" to cover all endpoints
                .allowedOrigins("http://localhost:3000","https://frontend-navy-eight-38.vercel.app")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                .allowedHeaders("*")  // Allow all headers for flexibility
                .exposedHeaders("Authorization")  // Expose Authorization header
                .allowCredentials(true)
                .maxAge(3600);
    }
}
