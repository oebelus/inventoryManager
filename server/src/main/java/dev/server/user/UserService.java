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

	@Autowired
	private ProductRepository productRepository;

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

	public Product addProduct(ProductDTO productDTO) {
		User user = userRepository.findById(productDTO.getUserId()).orElseThrow();
		Product product = Product.builder()
				.expiration(productDTO.getExpiration())
				.count(productDTO.getCount())
				.user(user)
				.build();
		user.getProducts().add(product);
		System.out.println(product);
		return product;
		// userRepository.save(user);
		// return productRepository.save(product);
	}

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		return userRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND, email)));
	}
}
