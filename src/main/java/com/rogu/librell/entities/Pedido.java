package com.rogu.librell.entities;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;




@Entity
@Table(name="pedido")
public class Pedido implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	private String endereco;
	private Long cNumber;
	private Long cCVV;
	private Long livro_id;
	@ManyToOne
	private User user;
	
	public Pedido() {
	}
	public Pedido(Long id, User user, Long livro_id, String endereco, Long cNumber, Long cCVV) {
		this.id = id;
		this.user = user;
		this.livro_id = livro_id;
		this.endereco = endereco;
		this.cNumber = cNumber;
		this.cCVV = cCVV;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public String getEndereco() {
		return endereco;
	}
	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}
	public Long getcNumber() {
		return cNumber;
	}
	public void setcNumber(Long cNumber) {
		this.cNumber = cNumber;
	}
	public Long getcCVV() {
		return cCVV;
	}
	public void setcCVV(Long cCVV) {
		this.cCVV = cCVV;
	}
	
	public Long getLivro_id() {
		return livro_id;
	}
	public void setLivro_id(Long livro_id) {
		this.livro_id = livro_id;
	}
	@Override
	public String toString() {
		return "Pedido [id=" + id + ", endereco=" + endereco + ", cNumber=" + cNumber + ", cCVV=" + cCVV + ", livro_id="
				+ livro_id + ", user=" + user + "]";
	}
	
	
	
	
}
