package com.rogu.librell.services;

import com.rogu.librell.dao.request.AddRequest;
import com.rogu.librell.dao.request.LoginRequest;
import com.rogu.librell.dao.response.AuthResponse;

public interface AuthenticationService {
    AuthResponse signup(AddRequest request);

    AuthResponse signin(LoginRequest request);
}
