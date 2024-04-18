package com.lazarostest.userprofile.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class UserProfileNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public UserProfileNotFoundException(Long id) {
		super("Perfil de usuário não encontrado com o ID: " + id);
	}
}
