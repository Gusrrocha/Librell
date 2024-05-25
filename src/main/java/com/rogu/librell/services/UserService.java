package com.rogu.librell.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rogu.librell.entities.User;
import com.rogu.librell.repositories.UserRepository;

@Service
public class UserService {
	
	@Autowired
	UserRepository rep;
	
	/*PasswordEncoder pwdEn;*/
	
	public Optional<User> findById(Long id) {
		Optional<User> resultado = rep.findById(id);
		return resultado;
	}
	public void insertUser(User user) {
		rep.save(user);
	}
	
	public List<User> getAllUsers(){
		List<User> lista = rep.findAll();
		return lista;
	}
	public void updateUser(User user, Long id) {
		User us = rep.findById(id).get();
		us.setUsername(user.getUsername());
		rep.save(user);
	}
	
	public void deleteUser(Long id) {
		rep.deleteById(id);
	}
	public User getLogin(User user){
		User resultado = rep.loginU(user.getUsername(), user.getPassword());
		return resultado;
	}
}
