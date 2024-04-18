package com.lazarostest.userprofile.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserProfileDTO {

	@NotBlank(message = "Descrição não pode ser em branco")
	@Size(min = 5, message = "Descrição deve ter pelo menos 5 caracteres")
	private String description;

}