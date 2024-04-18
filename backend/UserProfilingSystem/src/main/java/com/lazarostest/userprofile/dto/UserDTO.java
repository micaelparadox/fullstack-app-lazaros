package com.lazarostest.userprofile.dto;

import java.util.Set;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {

	@NotBlank(message = "Nome não pode ser em branco")
	@Size(min = 10, message = "Nome deve ter pelo menos 10 caracteres")
	private String name;

	private Set<UserProfileDTO> profiles;

}