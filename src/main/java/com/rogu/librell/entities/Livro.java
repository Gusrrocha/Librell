package com.rogu.librell.entities;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="livro")
public class Livro implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	private String descricao;
	private Float valor;
	private String pictpath;
	
	public Livro() {
		
	}

	public Livro(Long id, String name, String descricao, Float valor, String pictpath) {
		this.id = id;
		this.name = name;
		this.descricao = descricao;
		this.valor = valor;
		this.pictpath = pictpath;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Float getValor() {
		return valor;
	}

	public void setValor(Float valor) {
		this.valor = valor;
	}

	public String getPictpath() {
		return pictpath;
	}

	public void setPictpath(String pictpath) {
		this.pictpath = pictpath;
	}

	@Override
	public String toString() {
		return "Livro [id=" + id + ", name=" + name + ", descricao=" + descricao + ", valor=" + valor + ", pictpath="
				+ pictpath + "]";
	}
	
	
	
	
}