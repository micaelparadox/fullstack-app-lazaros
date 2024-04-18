package com.lazarostest.userprofile.service;

import java.util.List;
import java.util.Optional;

import com.lazarostest.userprofile.model.UserProfile;

public interface UserProfileService {
	UserProfile create(UserProfile userProfile);

	UserProfile update(Long id, UserProfile userProfile);

	void delete(Long id);

	Optional<UserProfile> getById(Long id);

	List<UserProfile> getAll();
}
