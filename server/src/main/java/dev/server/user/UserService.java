package dev.server.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service // or @Component
@AllArgsConstructor
public class UserService implements UserDetailsService { // it should be instantianted, aka being a bean

	private final String USER_NOT_FOUND = "User with email %s not found";
	@Autowired
	private UserRepository userRepository;

	public User createUser(User user) {
		return userRepository.save(user);
	}

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

	public User login(String email, String password) {
		User user = userRepository.findByEmail(email).orElse(null);
		if (user != null && user.getPassword().equals(password))
			return user;
		return null;
	}

	public User register(String email, String firstName, String lastName, String password) {
		if (userRepository.existsByEmail(email)) {
			throw new RuntimeException("User already exists with this email");
		}

		User newUser = new User();
		newUser.setEmail(email);
		newUser.setFirstName(firstName);
		newUser.setLastName(lastName);
		newUser.setPassword(password);
		newUser.setLogged(true);
		newUser.setRole(Role.USER);

		return userRepository.save(newUser);
	}

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		return userRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND, email)));
	}
}
