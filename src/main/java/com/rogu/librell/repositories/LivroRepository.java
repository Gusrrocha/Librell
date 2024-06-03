package com.rogu.librell.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.rogu.librell.entities.Livro;

import jakarta.transaction.Transactional;

public interface LivroRepository extends JpaRepository<Livro, Long>{
	@Modifying
	@Transactional
	@Query(nativeQuery = true, value= "UPDATE livro SET name = :name2, descricao = :descricao2, "
			+ "valor = :valor2, pictpath = :pictpath2 WHERE id = :id2")
	void update(String name2, String descricao2, Float valor2, String pictpath2, Long id2);
	
	@Query(nativeQuery = true, value="SELECT * FROM livro WHERE id = :id2")
	Livro findbyId(Long id2);
		
}
