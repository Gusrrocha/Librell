package com.rogu.librell.exceptions;

public class EntityNotFoundException extends RuntimeException{
	private static final long serialVersionUID = 1L;
	
	public EntityNotFoundException() {
		super("Id informado não encontrado.");
	}
	
	public EntityNotFoundException(String message) {
		super(message);
	}
}
