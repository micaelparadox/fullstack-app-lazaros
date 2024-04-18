package com.lazarostest.userprofile.config;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.lazarostest.userprofile.model.User;
import com.lazarostest.userprofile.model.UserProfile;
import com.lazarostest.userprofile.repository.UserProfileRepository;
import com.lazarostest.userprofile.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

	private final UserProfileRepository userProfileRepository;
	private final UserRepository userRepository;

	@Override
	@Transactional
	public void run(String... args) {
		createProfilesAndUsers();
	}

	private void createProfilesAndUsers() {
		if (userProfileRepository.count() == 0 && userRepository.count() == 0) {
			UserProfile adminProfile = createProfileIfNotFound("Administrador");
			UserProfile userProfile = createProfileIfNotFound("Usuário");

			Set<UserProfile> profiles = new HashSet<>(Arrays.asList(adminProfile, userProfile));

			createUserIfNotFound("Micael Santana", profiles);
		}
	}

	private UserProfile createProfileIfNotFound(String description) {
		return userProfileRepository.findByDescription(description)
				.orElseGet(() -> userProfileRepository.save(new UserProfile(null, description, new HashSet<>())));
	}

	private void createUserIfNotFound(String name, Set<UserProfile> profiles) {
		userRepository.findByName(name).orElseGet(() -> {
			User user = new User(null, name, profiles);
			profiles.forEach(profile -> profile.getUsers().add(user));
			return userRepository.save(user);
		});
	}
}
