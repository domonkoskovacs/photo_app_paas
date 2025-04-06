package hu.photo.backend.controller;

import java.util.List;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import hu.photo.backend.adapter.PhotoAdapter;
import hu.photo.backend.model.request.PhotoRequest;
import hu.photo.backend.model.request.SortType;
import hu.photo.backend.model.response.PhotoMetadataResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/photo")
@RequiredArgsConstructor
public class PhotoController {

    private final PhotoAdapter photoAdapter;

    @GetMapping(value = "/{id}", produces = {MediaType.IMAGE_PNG_VALUE, MediaType.IMAGE_JPEG_VALUE})
    public ResponseEntity<ByteArrayResource> getById(@PathVariable Long id) {
        return ResponseEntity.ok(photoAdapter.getById(id));
    }

    @GetMapping(value = "/metadata", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<PhotoMetadataResponse>> getAllMetadata(@RequestParam(required = false) SortType sortBy) {
        return ResponseEntity.ok(photoAdapter.getAllMetadata(sortBy));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> upload(@Valid @ModelAttribute PhotoRequest request) {
        photoAdapter.save(request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        photoAdapter.delete(id);
        return ResponseEntity.ok().build();
    }
}
