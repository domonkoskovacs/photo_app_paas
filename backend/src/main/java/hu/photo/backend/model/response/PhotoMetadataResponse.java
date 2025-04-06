package hu.photo.backend.model.response;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotNull;

public record PhotoMetadataResponse(
        @NotNull Long id,
        @NotNull String name,
        @NotNull LocalDateTime uploadDate
) {
}
