package dev.server.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

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

	@PostMapping("/addItem/{userId}")
	public Product postMethodName(@PathVariable String userId, @RequestBody ProductDTO productDTO) throws Exception {
		productDTO.setUserId(Long.parseUnsignedLong(userId));
		Product product = userService.addProduct(productDTO);
		return product;
	}

}
