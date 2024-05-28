package com.rogu.librell.controllers;

import java.time.Instant;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rogu.librell.entities.Livro;
import com.rogu.librell.exceptions.BadRequestException;
import com.rogu.librell.infra.RestErrorMessage;
import com.rogu.librell.services.LivroService;

@CrossOrigin("*")
@RestController
@RequestMapping(value="/api/v1/livro")
public class LivroController {
	
	@Autowired 
	LivroService service;
	
	@GetMapping()
	public ResponseEntity<List<Livro>> getAll(){
		List<Livro> result = service.getAllBooks();
		
		return ResponseEntity.ok(result);
	}
	
	@PostMapping()
	public ResponseEntity<?> addBook(@RequestBody Livro livro)
	{
		try 
		{
			service.addBook(livro);
			return ResponseEntity.ok().body("Livro adicionado com sucesso!");
		} 
		catch (BadRequestException e) 
		{
			RestErrorMessage badRequest = new RestErrorMessage();
			
			badRequest.setTimestamp(Instant.now());
			badRequest.setStatus(HttpStatus.BAD_REQUEST.value());
			badRequest.setError(HttpStatus.BAD_REQUEST);
			badRequest.setMessage(e.getMessage());
			badRequest.setPath("path");
			
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(badRequest);
		}	
	}
	@PutMapping("/{id}")
	public ResponseEntity<String> updateBook(@RequestBody Livro livro, @PathVariable Long id){
		service.updateBook(livro, id);
		return ResponseEntity.ok("Livro atualizado com sucesso!");
	}
}
