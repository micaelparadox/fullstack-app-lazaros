package com.lazarostest.userprofile.service;

import java.util.List;
import java.util.Optional;

import com.lazarostest.userprofile.model.User;

public interface UserService {
	User create(User user);

	Optional<User> update(Long id, User user);

	boolean delete(Long id);

	Optional<User> getById(Long id);

	List<User> getAll();
}
