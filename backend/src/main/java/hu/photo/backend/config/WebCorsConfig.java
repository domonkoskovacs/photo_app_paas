package hu.photo.backend.config;

import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class WebCorsConfig {

    private final CorsProperties corsProperties;

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(corsProperties.getPaths())
                        .allowedMethods("*")
                        .allowedHeaders("*")
                        .allowCredentials(false);
            }
        };
    }

    @Data
    @Component
    @ConfigurationProperties("spring.security.cors.enabled")
    public static class CorsProperties {
        private String paths;
    }
}
