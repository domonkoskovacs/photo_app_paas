package hu.photo.backend.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import hu.photo.backend.entity.User;
import hu.photo.backend.model.request.AuthRequest;
import hu.photo.backend.service.JwtService;
import hu.photo.backend.service.UserService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public void register(@RequestBody AuthRequest request) {
        userService.save(request.email(), passwordEncoder.encode(request.password()));
    }

    @PostMapping("/login")
    public hu.photo.backend.model.response.AuthResponse login(@RequestBody AuthRequest request) {
        Optional<User> user = userService.findByEmail(request.email());
        if (user.isEmpty() || !passwordEncoder.matches(request.password(), user.get().getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }
        return new hu.photo.backend.model.response.AuthResponse(jwtService.generateToken(user.get().getEmail()));
    }
}

