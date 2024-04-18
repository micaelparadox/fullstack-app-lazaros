package com.lazarostest.userprofile.controller;

import java.net.URI;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lazarostest.userprofile.dto.UserDTO;
import com.lazarostest.userprofile.model.User;
import com.lazarostest.userprofile.model.UserProfile;
import com.lazarostest.userprofile.service.UserProfileService;
import com.lazarostest.userprofile.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private UserProfileService userProfileService;

	@PostMapping
	public ResponseEntity<User> createUser(@Valid @RequestBody UserDTO userDTO) {
		User user = convertToEntity(userDTO);
		User createdUser = userService.create(user);
		return ResponseEntity.created(URI.create("/api/users/" + createdUser.getId())).body(createdUser);
	}

	@GetMapping("/{id}")
	public ResponseEntity<User> getUserById(@PathVariable Long id) {
		return userService.getById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}

	@GetMapping
	public ResponseEntity<List<User>> getAllUsers() {
		return ResponseEntity.ok(userService.getAll());
	}

	@PutMapping("/{id}")
	public ResponseEntity<User> updateUser(@PathVariable Long id, @Valid @RequestBody UserDTO userDTO) {
		User updatedUser = convertToEntity(userDTO);
		return userService.update(id, updatedUser).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
		if (userService.delete(id)) {
			return ResponseEntity.ok().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	private User convertToEntity(UserDTO userDTO) {
		User user = new User();
		user.setName(userDTO.getName());

		if (userDTO.getProfiles() != null && !userDTO.getProfiles().isEmpty()) {
			Set<UserProfile> profiles = userDTO.getProfiles().stream()
					.map(profileDTO -> new UserProfile(null, profileDTO.getDescription(), new HashSet<>()))
					.collect(Collectors.toSet());
			user.setProfiles(profiles);

			profiles.forEach(userProfileService::create);
		}

		return user;
	}

}
