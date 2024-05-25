package com.rogu.librell.dto;



public class UserDTO {
	
	private long id;
	private String username;
	private String password;
	private long adminKey;
	
	
	public UserDTO() {
		
	}
	public UserDTO(long id, String username, String password, long adminKey) {
		this.id = id;
		this.username = username;
		this.password = password;
		this.adminKey = adminKey;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public long getAdminKey() {
		return adminKey;
	}
	public void setAdminKey(long adminKey) {
		this.adminKey = adminKey;
	}
	
	
}
