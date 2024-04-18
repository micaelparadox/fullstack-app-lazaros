package com.lazarostest.userprofile.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lazarostest.userprofile.exception.UserProfileNotFoundException;
import com.lazarostest.userprofile.model.UserProfile;
import com.lazarostest.userprofile.repository.UserProfileRepository;
import com.lazarostest.userprofile.service.UserProfileService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserProfileServiceImpl implements UserProfileService {

	@Autowired
	private final UserProfileRepository userProfileRepository;

	@Override
	public UserProfile create(UserProfile userProfile) {
		return userProfileRepository.save(userProfile);
	}

	@Override
	public UserProfile update(Long id, UserProfile userProfile) {
		return userProfileRepository.findById(id).map(existingUserProfile -> {
			existingUserProfile.setDescription(userProfile.getDescription());
			return userProfileRepository.save(existingUserProfile);
		}).orElseThrow(() -> new UserProfileNotFoundException(id));
	}

	@Override
	public void delete(Long id) {
		userProfileRepository.deleteById(id);
	}

	@Override
	public Optional<UserProfile> getById(Long id) {
		return userProfileRepository.findById(id);
	}

	@Override
	public List<UserProfile> getAll() {
		return userProfileRepository.findAll();
	}
}
