package dev.server.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@CrossOrigin
@RequestMapping(path = "api/user")
public class UserController {

	@Autowired
	private UserService userService;

	@GetMapping()
	public UserDTO getUser(@RequestParam String email) throws Exception {
		User user = userService.getuser(email);

		UserDTO userDTO = UserDTO.mapToDTO(user);
		return userDTO;
	}
}
