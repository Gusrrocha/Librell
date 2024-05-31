package com.rogu.librell.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
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
		Path dir = Paths.get("C:\\Users\\Pichau\\Documents\\java\\springg\\librell\\frontend\\public\\images");  // specify your directory

		try {
			Optional<Path> lastFilePath = Files.list(dir)
			          .filter(p -> !Files.isDirectory(p))
			          .sorted((p1, p2)-> Long.valueOf(p2.toFile().lastModified())
			            .compareTo(p1.toFile().lastModified()))
			          .findFirst();
				livro.setPictpath(lastFilePath.toString());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}  // finally get the last file using simple comparator by lastModified field
		
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