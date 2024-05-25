package com.rogu.librell.controllers;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rogu.librell.entities.User;
import com.rogu.librell.repositories.UserRepository;
import com.rogu.librell.services.UserService;


@CrossOrigin("*")
@RestController
@RequestMapping(value="/user")
public class UserController {

	@Autowired
	UserService service;
	@Autowired
	UserRepository rep;

	@PostMapping("/login")
	public ResponseEntity<User> getUser(@RequestBody User user){
		User usuario = service.getLogin(user);
		String name1 = usuario.getUsername();
		String name2 = user.getUsername();
	
		if ((name1.equals(name2)) && (usuario.getPassword().equals(user.getPassword()))) {
			return ResponseEntity.ok(usuario);
		}
		else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
	}
	@PostMapping()
	public void insertUser(@RequestBody User user)
	{
		service.insertUser(user);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<User> updateUser(@RequestBody User user, @PathVariable Long id) {
		Optional<User> usuario = service.findById(id);
		if(usuario.isPresent()) {
			User _user = usuario.get();
			_user.setUsername(user.getUsername());
			_user.setPassword(user.getPassword());
			_user.setKey(user.getKey());
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
	
}
