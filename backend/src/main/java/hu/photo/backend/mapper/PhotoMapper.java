package hu.photo.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import hu.photo.backend.entity.Photo;
import hu.photo.backend.model.response.PhotoMetadataResponse;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PhotoMapper {

    PhotoMetadataResponse toMetadata(Photo photo);
}
