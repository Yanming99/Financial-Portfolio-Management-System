package com.fintrack.portfolio.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // allow all (for testing onlyu)
                .allowedOrigins("http://localhost:5173") 
                .allowedMethods("*") 
                .allowedHeaders("*") 
                .allowCredentials(true); 
    }
}
