package dev.registration;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "api/register")
@AllArgsConstructor
public class RegisterController {

    private RegisterService registerService;

    public String register(@RequestBody RegisterRequest request) {
        return registerService.register(request);
    }
}
