package com.rogu.librell.infra;

import java.time.Instant;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpServerErrorException.InternalServerError;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.rogu.librell.exceptions.EntityNotFoundException;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler{
	
	@ExceptionHandler(EntityNotFoundException.class)
	private ResponseEntity<RestErrorMessage> entityNotFoundException(
			EntityNotFoundException exception, HttpServletRequest request){
		RestErrorMessage threatResponse = new RestErrorMessage();
		
		threatResponse.setTimestamp(Instant.now());
		threatResponse.setStatus(HttpStatus.NOT_FOUND.value());
		threatResponse.setError(HttpStatus.NOT_FOUND);
		threatResponse.setMessage(exception.getMessage());
		threatResponse.setPath(request.getRequestURI());
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(threatResponse);
	}
	@ExceptionHandler(InternalServerError.class)
	private ResponseEntity<RestErrorMessage> entityNotFoundException(
			InternalServerError exception, HttpServletRequest request){
		RestErrorMessage threatResponse = new RestErrorMessage();
		
		threatResponse.setTimestamp(Instant.now());
		threatResponse.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
		threatResponse.setError(HttpStatus.INTERNAL_SERVER_ERROR);
		threatResponse.setMessage(exception.getMessage());
		threatResponse.setPath(request.getRequestURI());
		
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(threatResponse);
	}
	@ExceptionHandler(RuntimeException.class)
	private ResponseEntity<RestErrorMessage> entityNotFoundException(
			RuntimeException exception, HttpServletRequest request){
		RestErrorMessage threatResponse = new RestErrorMessage();
		
		threatResponse.setTimestamp(Instant.now());
		threatResponse.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
		threatResponse.setError(HttpStatus.INTERNAL_SERVER_ERROR);
		threatResponse.setMessage(exception.getMessage());
		threatResponse.setPath(request.getRequestURI());
		
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(threatResponse);
	}
}
