package dev.server.user;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
    public Long id;
    public String firstName;
    public String lastName;
    public List<Product> products;

    public static UserDTO mapToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setProducts(user.getProducts());
        userDTO.setId(user.getId());
        return userDTO;
    }
}
