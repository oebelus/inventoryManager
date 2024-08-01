package dev.server.registration;

import org.springframework.context.annotation.Configuration;

@Configuration
public class RegisterService {

    String register(RegisterRequest request) {
        return "works!";
    }
}