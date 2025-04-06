package hu.photo.backend.service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import hu.photo.backend.entity.Photo;
import hu.photo.backend.repository.PhotoRepository;
import lombok.RequiredArgsConstructor;

@Transactional
@Service
@RequiredArgsConstructor
public class PhotoService {
    private final PhotoRepository photoRepository;

    public void save(String name, byte[] image) {
        if (name.length() > 40) {
            throw new IllegalArgumentException("Photo name must be at most 40 characters.");
        }

        long photoCount = photoRepository.count();
        if (photoCount >= 100) {
            throw new IllegalStateException("A maximum of 100 photos can be uploaded.");
        }

        Photo photo = new Photo();
        photo.setName(name);
        photo.setUploadDate(LocalDateTime.now());
        photo.setImage(image);

        photoRepository.save(photo);
    }

    @Transactional(readOnly = true)
    public Photo getPhotoById(Long id) {
        return photoRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Photo not found with ID: " + id));
    }

    public void deletePhoto(Long id) {
        if (!photoRepository.existsById(id)) {
            throw new NoSuchElementException("Photo to delete not found with ID: " + id);
        }
        photoRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<Photo> getPhotoMetadata(String sortBy) {
        List<Photo> photos = photoRepository.findAll();

        if (sortBy == null) {
            return photos;
        }

        Comparator<Photo> comparator = switch (sortBy) {
            case "name" -> Comparator.comparing(Photo::getName);
            case "date" -> Comparator.comparing(Photo::getUploadDate);
            default -> throw new IllegalArgumentException("Invalid sort key: " + sortBy);
        };

        return photos.stream()
                .sorted(comparator)
                .toList();
    }

}
