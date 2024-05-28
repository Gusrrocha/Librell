package com.rogu.librell.controllers;




import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rogu.librell.dao.request.AddRequest;
import com.rogu.librell.dao.request.LoginRequest;
import com.rogu.librell.dao.response.AuthResponse;
import com.rogu.librell.services.AuthenticationService;


import lombok.RequiredArgsConstructor;


@CrossOrigin("*")
@RestController
@RequestMapping(value="/api/v1/user")
@RequiredArgsConstructor
public class UserController {
	private final AuthenticationService authenticationService;
	
	@PostMapping("/cadastro")
	public ResponseEntity<AuthResponse> signup(@RequestBody AddRequest request) {
		return ResponseEntity.ok(authenticationService.signup(request));
	}

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> signin(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authenticationService.signin(request));
    }
    /*
	@PutMapping("/{id}")
	public ResponseEntity<User> updateUser(@RequestBody User user, @PathVariable Long id) {
		Optional<User> usuario = service.findById(id);
		if(usuario.isPresent()) {
			User _user = usuario.get();
			_user.setUsername(user.getUsername());
			_user.setPassword(user.getPassword());
			_user.setERole(user.getERole());
			return new ResponseEntity<>(service.save(_user), HttpStatus.OK);
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
	*/
}
