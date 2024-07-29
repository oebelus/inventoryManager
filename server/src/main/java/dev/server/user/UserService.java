package dev.server.user;

import java.util.List;

import org.springframework.stereotype.Service;

@Service // or @Component
public class UserService { // it should be instantianted, aka being a bean
    public List<User> getUser() {
		return List.of(
			new User(
				"johndoe@gmail.com",
				"sdjh3653446",
				"John",
				"Doe"
			)
		);
	}
}
