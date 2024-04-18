package com.lazarostest.userprofile.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lazarostest.userprofile.model.User;
import com.lazarostest.userprofile.repository.UserRepository;
import com.lazarostest.userprofile.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;

	@Override
	public User create(User user) {
		return userRepository.save(user);
	}

	@Override
	public Optional<User> update(Long id, User updatedUser) {
		return userRepository.findById(id).map(user -> {
			user.setName(updatedUser.getName());
			user.setProfiles(updatedUser.getProfiles());
			return userRepository.save(user);
		});
	}

	@Override
	public boolean delete(Long id) {
		return userRepository.findById(id).map(user -> {
			userRepository.delete(user);
			return true;
		}).orElse(false);
	}

	@Override
	public Optional<User> getById(Long id) {
		return userRepository.findById(id);
	}

	@Override
	public List<User> getAll() {
		return userRepository.findAll();
	}
}
