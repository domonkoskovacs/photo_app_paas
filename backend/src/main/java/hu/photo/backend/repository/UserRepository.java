package hu.photo.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import hu.photo.backend.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
