package hu.photo.backend.exception;

import java.io.IOException;

public class PhotoException extends RuntimeException {
    public PhotoException(String s, IOException e) {
        super(s, e);
    }
}
