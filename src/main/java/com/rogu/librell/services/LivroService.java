package com.rogu.librell.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rogu.librell.entities.Livro;
import com.rogu.librell.entities.Pedido;
import com.rogu.librell.repositories.LivroRepository;
import com.rogu.librell.repositories.PedRepository;

@Service
public class LivroService {

	
	@Autowired
	LivroRepository rep;

	@Autowired
	PedRepository ped;

	
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
		rep.update(livro.getName(), livro.getDescricao(), livro.getValor(),livro.getPictpath(),id);
	}
	
	public void addPedido(Pedido pedido) {
		ped.save(pedido);
	}
	
	public void deleteBook(Long id) {
		rep.deleteById(id);
	}

}