package hu.photo.backend.model.request;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record PhotoRequest(
        @NotBlank @Size(max = 40) String name,
        @NotNull MultipartFile image
) {
}
