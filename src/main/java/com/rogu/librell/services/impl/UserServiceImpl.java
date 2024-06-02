package com.rogu.librell.services.impl;



import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.rogu.librell.entities.User;
import com.rogu.librell.repositories.UserRepository;
import com.rogu.librell.services.UserService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService  {
	
	private final UserRepository rep;
 
	
    @Override
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
		    @Override
		    public UserDetails loadUserByUsername(String email) {
		        return rep.findByEmail(email)
		                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
		    }
        };
    }
    
    public User findbyEm(String email){ 	
    	return rep.findbyEm(email);
    }
    public List<User> getAll(){
		List<User> lista = rep.findAll();
		return lista;
	}
    
    public Optional<User> findById(Long id) {
		Optional<User> resultado = rep.findById(id);
		return resultado;
	}
    
	public void insertUser(User user) {
		rep.save(user);
	}
	
	public void updateUser(User user, Long id) {
		rep.update(user.getFirstName(),user.getLastName(),user.getPassword(), user.getEmail(), id);
	}
	
	public void update(User user, Long id) {
		rep.update(user.getFirstName(),user.getLastName(), user.getEmail(), id);
	}
	
	public void update(String password, Long id) {
		rep.update(password, id);
	}
	
	
	
	public void deleteUser(Long id) {
		rep.deleteById(id);
	}
	
	
	
	
	
	
	/*
	public UserDetails getLogin(User user) throws UsernameNotFoundException{
		User resultado = rep.loginU(user.getUsername(), user.getPassword());
		
		if (resultado==null) {
			throw new UsernameNotFoundException("Nenhum usuário with this username.");
		}
		List<GrantedAuthority> authorities = new ArrayList<>();
		return new org.springframework.security.core.userdetails.User( 
                user.getUsername(), 
                user.getPassword(), 
                authorities); 
	}
	/*
	public UserDetails getLogin(String user) throws UsernameNotFoundException{
		User resultado = rep.findByUsername(user);
		
		if (resultado==null) {
			throw new UsernameNotFoundException("Nenhum usuário with this username.");
		}
		List<GrantedAuthority> authorities = new ArrayList<>();
		return new org.springframework.security.core.userdetails.User( 
                resultado.getUsername(), 
                resultado.getPassword(), 
                authorities); 
	}
	*/
}