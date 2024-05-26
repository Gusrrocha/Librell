package com.rogu.librell.controllers;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException; 
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken; 
import org.springframework.security.core.Authentication; 
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import com.rogu.librell.config.JwtProvider;
import com.rogu.librell.entities.User;
import com.rogu.librell.repositories.UserRepository;
import com.rogu.librell.response.AuthResponse;
import com.rogu.librell.services.UserService;


@CrossOrigin("*")
@RestController
@RequestMapping(value="/user")
public class UserController {

	@Autowired
	UserService service;
	@Autowired
	UserRepository rep;
	@Autowired
    private PasswordEncoder passwordEncoder; 

	@PostMapping("/login")
	public ResponseEntity<AuthResponse> getUser(@RequestBody User user){
		String username = user.getUsername(); 
        String password = user.getPassword(); 
  
        System.out.println(username+"-------"+password); 
        
        Authentication authentication = authenticate(username,password); 
        SecurityContextHolder.getContext().setAuthentication(authentication); 
  
        String token = JwtProvider.generateToken(authentication); 
        AuthResponse authResponse = new AuthResponse(); 
  
        authResponse.setMessage("Login success"); 
        authResponse.setJwt(token); 
        authResponse.setStatus(true); 
  
        return new ResponseEntity<>(authResponse,HttpStatus.OK); 
		
	}
	@PostMapping()
	public ResponseEntity<AuthResponse> insertUser(@RequestBody User user)
	{
		String username = user.getUsername();
        String password = user.getPassword();
        
        User isUsernameExist = rep.findByUsername(user.getUsername()); 
        if (isUsernameExist != null) { 
            //throw new Exception("Username Is Already Used With Another Account"); 
  
        } 
        User createdUser = new User(); 
        createdUser.setUsername(username); 
        createdUser.setPassword(passwordEncoder.encode(password)); 
        createdUser.setAdminkey((long) 0);
        service.insertUser(createdUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(username,password); 
        SecurityContextHolder.getContext().setAuthentication(authentication); 
        String token = JwtProvider.generateToken(authentication); 
  
  
        AuthResponse authResponse = new AuthResponse(); 
        authResponse.setJwt(token); 
        authResponse.setMessage("Register Success"); 
        authResponse.setStatus(true); 
        return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.OK); 
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<User> updateUser(@RequestBody User user, @PathVariable Long id) {
		Optional<User> usuario = service.findById(id);
		if(usuario.isPresent()) {
			User _user = usuario.get();
			_user.setUsername(user.getUsername());
			_user.setPassword(user.getPassword());
			_user.setAdminkey(user.getAdminkey());
			return new ResponseEntity<>(rep.save(_user), HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
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
	
	private Authentication authenticate(String username, String password) { 
		  
        System.out.println(username+"---++----"+password); 
  
        UserDetails userDetails = service.getLogin(username); 
  
        System.out.println("Sig in in user details"+ userDetails); 
  
        if(userDetails == null) { 
            System.out.println("Sign in details - null" + userDetails); 
  
            throw new BadCredentialsException("Invalid username and password"); 
        } 
        if(!passwordEncoder.matches(password,userDetails.getPassword())) { 
            System.out.println("Sign in userDetails - password mismatch"+userDetails); 
  
            throw new BadCredentialsException("Invalid password"); 
  
        } 
        return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities()); 
  
    } 
	
}
