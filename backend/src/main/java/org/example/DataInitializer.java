package org.example;

import org.example.entity.User;
import org.example.repo.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        // Check if the user already exists
        if (userRepository.count() == 0) {
            // Create a new user
            User user = new User();
            user.setUsername("admin");
            user.setPassword("password"); // Plaintext for now, in real apps, hash it
            user.setRole("ADMIN");

            // Save the user to the database
            userRepository.save(user);
        }
    }
}
