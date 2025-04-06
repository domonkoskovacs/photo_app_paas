package hu.photo.backend.adapter;

import java.io.IOException;
import java.util.List;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;

import hu.photo.backend.entity.Photo;
import hu.photo.backend.exception.PhotoException;
import hu.photo.backend.mapper.PhotoMapper;
import hu.photo.backend.model.request.PhotoRequest;
import hu.photo.backend.model.response.PhotoMetadataResponse;
import hu.photo.backend.service.PhotoService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PhotoAdapter {
    private final PhotoService photoService;
    private final PhotoMapper photoMapper;

    public ByteArrayResource getById(Long id) {
        Photo photo = photoService.getPhotoById(id);
        return new ByteArrayResource(photo.getImage());
    }

    public List<PhotoMetadataResponse> getAllMetadata(String sortBy) {
        return photoService.getPhotoMetadata(sortBy).stream()
                .map(photoMapper::toMetadata)
                .toList();
    }

    public void save(PhotoRequest request) {
        try {
            photoService.save(request.name(), request.image().getBytes());
        } catch (IOException e) {
            throw new PhotoException("Failed to read image bytes from uploaded file.", e);
        }
    }

    public void delete(Long id) {
        photoService.deletePhoto(id);
    }
}
