package com.rogu.librell.controllers;




import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rogu.librell.dao.request.AddRequest;
import com.rogu.librell.dao.request.LoginRequest;
import com.rogu.librell.dao.response.AuthResponse;
import com.rogu.librell.entities.User;
import com.rogu.librell.services.AuthenticationService;
import com.rogu.librell.services.JwtService;
import com.rogu.librell.services.impl.UserServiceImpl;
import com.rogu.librell.dao.response.AuthResponse;
import lombok.RequiredArgsConstructor;


@CrossOrigin("*")
@RestController
@RequestMapping(value="/api/v1/user")
@RequiredArgsConstructor
public class UserController {
	private final AuthenticationService authenticationService;
	private final PasswordEncoder pwenc;
	private final JwtService jwtservice;
	@Autowired
	UserServiceImpl service;
	
	@PostMapping("/cadastro")
	public ResponseEntity<AuthResponse> signup(@RequestBody AddRequest request) {
		return ResponseEntity.ok(authenticationService.signup(request));
	}

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> signin(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authenticationService.signin(request));
    }
    
    @GetMapping()
	public ResponseEntity<List<User>> getAll(){
		List<User> result = service.getAll();
		
		return ResponseEntity.ok(result);
	}
    
    @PostMapping("/getOne")
    public ResponseEntity<User> getOne(@RequestBody String email){
    	User us = service.findbyEm(email.replace("=", "").replace("%40", "@"));
    	return ResponseEntity.ok(us);
    }
	@PutMapping("/{id}")
	public ResponseEntity<HttpStatus> updateUser(@RequestBody User user, @PathVariable Long id) {
		try {
			String pw = user.getPassword();
			user.setPassword(pwenc.encode(pw));
			service.updateUser(user, id);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<AuthResponse> update(@RequestBody User user, @PathVariable Long id) {
		service.update(user, id);
		User us = service.findbyEm(user.getEmail());
		var jwt = jwtservice.generateToken(us);
		return ResponseEntity.ok(AuthResponse.builder().token(jwt).build());
	}
	
	@PutMapping("/update/password/{id}")
	public void update(@RequestBody String password,@PathVariable Long id) {
		
		service.update(pwenc.encode(password), id);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<HttpStatus> deleteUser(@PathVariable Long id){
		try {
			service.deleteUser(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
}
