package dev.server.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping(path = "api/user")
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping
	public User createUser(@RequestBody User user) {
		return userService.createUser(user);
	}

	@GetMapping("/{email}")
	public User getUserById(@PathVariable String email) {
		return userService.getuser(email);
	}

	@PostMapping("/login")
	public User userLogin(@RequestBody LoginRequest loginRequest) {
		return userService.login(loginRequest.getEmail(), loginRequest.getPassword());
	}

}
