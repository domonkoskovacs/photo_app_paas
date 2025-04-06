package hu.photo.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import hu.photo.backend.entity.Photo;

public interface PhotoRepository extends JpaRepository<Photo, Long> {
}
