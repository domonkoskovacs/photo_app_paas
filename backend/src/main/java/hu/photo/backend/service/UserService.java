package hu.photo.backend.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import hu.photo.backend.entity.User;
import hu.photo.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repo;

    public void save(String email, String hashedPassword) {
        if (repo.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("Email already registered");
        }
        repo.save(new User(null, email, hashedPassword, "USER"));
    }

    public Optional<User> findByEmail(String email) {
        return repo.findByEmail(email);
    }
}

