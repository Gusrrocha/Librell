package com.rogu.librell.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.rogu.librell.entities.User;

import jakarta.transaction.Transactional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {	 
	Optional<User> findByEmail(String email);
	@Query(nativeQuery = true, value = "select * from usuario u where upper(u.email) = upper(:email2);")
	User findbyEm(String email2);
	
	@Modifying
	@Transactional
	@Query(nativeQuery = true, value= "UPDATE usuario SET first_Name = :firstName2, last_Name = :lastName2, "
			+ "email = :email2, password = :password2 WHERE id = :id2")
	void update(String firstName2, String lastName2, String password2, String email2, Long id2);
	
	@Modifying
	@Transactional
	@Query(nativeQuery = true, value= "UPDATE usuario SET first_Name = :firstName2, last_Name = :lastName2, "
			+ "email = :email2 WHERE id = :id2")
	void update(String firstName2, String lastName2, String email2, Long id2);
	
	@Modifying
	@Transactional
	@Query(nativeQuery = true, value= "UPDATE usuario SET password = :password2 WHERE id = :id2")
	void update(String password2, Long id2);
	
	@Query(nativeQuery = true, value = "select * from usuario u where id = :id2")
	User findByIdN(Long id2);
	
}
