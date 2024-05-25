package com.rogu.librell.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rogu.librell.entities.Livro;
import com.rogu.librell.exceptions.EntityNotFoundException;
import com.rogu.librell.repositories.LivroRepository;

@Service
public class LivroService {

	
	@Autowired
	LivroRepository rep;
	
	public List<Livro> getAllBooks(){
		List<Livro> lista = rep.findAll();
		return lista;
	}
	
	public void addBook(Livro livro) {
		rep.save(livro);
	}
	
	public void updateBook(Livro livro, Long id) {
		Livro liv = rep.findById(id)
				.orElseThrow(EntityNotFoundException::new);
		liv.setName(livro.getName());
		liv.setDescricao(livro.getDescricao());
		liv.setValor(livro.getValor());
		liv.setPictpath(livro.getPictpath());
		rep.save(liv);
	}
}