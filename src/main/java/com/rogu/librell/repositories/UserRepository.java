package com.rogu.librell.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.rogu.librell.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
	 @Query("SELECT u FROM User u WHERE u.username = :username and u.password = :password")
	  User loginU(String username, String password);
}
