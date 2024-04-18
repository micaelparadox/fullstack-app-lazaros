package com.lazarostest.userprofile.controller;

import java.net.URI;
import java.util.List;

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

import com.lazarostest.userprofile.dto.UserProfileDTO;
import com.lazarostest.userprofile.model.UserProfile;
import com.lazarostest.userprofile.service.UserProfileService;

@RestController
@RequestMapping("/api/userprofiles")
public class UserProfileController {

	@Autowired
	private UserProfileService userProfileService;

	@PostMapping
	public ResponseEntity<UserProfile> createUserProfile(@Valid @RequestBody UserProfileDTO userProfileDTO) {
		UserProfile userProfile = convertToEntity(userProfileDTO);
		UserProfile createdUserProfile = userProfileService.create(userProfile);
		return ResponseEntity.created(URI.create("/api/userprofiles/" + createdUserProfile.getId()))
				.body(createdUserProfile);
	}

	@GetMapping("/{id}")
	public ResponseEntity<UserProfile> getUserProfileById(@PathVariable Long id) {
		return userProfileService.getById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}

	@GetMapping
	public ResponseEntity<List<UserProfile>> getAllUserProfiles() {
		return ResponseEntity.ok(userProfileService.getAll());
	}

	@PutMapping("/{id}")
	public ResponseEntity<UserProfile> updateUserProfile(@PathVariable Long id,
			@Valid @RequestBody UserProfileDTO userProfileDTO) {
		UserProfile updatedUserProfile = convertToEntity(userProfileDTO);
		updatedUserProfile.setId(id);
		updatedUserProfile = userProfileService.update(id, updatedUserProfile);
		return ResponseEntity.ok(updatedUserProfile);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteUserProfile(@PathVariable Long id) {
		userProfileService.delete(id);
		return ResponseEntity.ok().build();
	}

	private UserProfile convertToEntity(UserProfileDTO userProfileDTO) {
		UserProfile userProfile = new UserProfile();
		userProfile.setDescription(userProfileDTO.getDescription());
		return userProfile;
	}
}
