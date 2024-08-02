package dev.server.user;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDTO {
    public LocalDate expiration;
    public Integer count;
    public Long userId;
    public Long id;
}
