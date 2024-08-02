package dev.server.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service // or @Component
@AllArgsConstructor
public class UserService implements UserDetailsService {

	private final String USER_NOT_FOUND = "User with email %s not found";

	@Autowired
	private UserRepository userRepository;

	public User getuser(String email) {
		return userRepository.findByEmail(email).orElse(null);
	}

	public User updateUser(Long id, User user) {
		user.setId(id);
		return userRepository.save(user);
	}

	public void deleteUser(Long id) {
		userRepository.deleteById(id);
	}

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		return userRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND, email)));
	}
}
