package com.rogu.librell.services.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.rogu.librell.dao.request.AddRequest;
import com.rogu.librell.dao.request.LoginRequest;
import com.rogu.librell.dao.response.AuthResponse;
import com.rogu.librell.entities.ERole;
import com.rogu.librell.entities.User;
import com.rogu.librell.repositories.UserRepository;
import com.rogu.librell.services.AuthenticationService;
import com.rogu.librell.services.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    @Override
    public AuthResponse signup(AddRequest request) {
        var user = new User(null, request.getFirstName(),
        		request.getLastName(),
        		request.getEmail(),
        		passwordEncoder.encode(request.getPassword()),
        		ERole.ROLE_USER);
        userRepository.save(user);
        var jwt = jwtService.generateToken(user);
        return AuthResponse.builder().token(jwt).build();
    }

    @Override
    public AuthResponse signin(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));
        var jwt = jwtService.generateToken(user);
        return AuthResponse.builder().token(jwt).build();
    }
}
