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
import com.rogu.librell.entities.Livro;
import com.rogu.librell.entities.User;
import com.rogu.librell.services.AuthenticationService;
import com.rogu.librell.services.impl.UserServiceImpl;

import lombok.RequiredArgsConstructor;


@CrossOrigin("*")
@RestController
@RequestMapping(value="/api/v1/user")
@RequiredArgsConstructor
public class UserController {
	private final AuthenticationService authenticationService;
	private final PasswordEncoder pwenc;
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
	
	@DeleteMapping("/{id}")
	public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") Long id){
		try {
			service.deleteUser(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
}
