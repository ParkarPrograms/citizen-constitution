package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LoginController {

    @GetMapping("/login")
    public String showLoginPage() {
        return "login";
    }

    @PostMapping("/login")
    public ModelAndView login(@RequestParam String username, @RequestParam String password) {
        // For simplicity, hardcoded check (replace with real authentication logic)
        if ("user".equals(username) && "password".equals(password)) {
            return new ModelAndView("welcome");
        }
        return new ModelAndView("login", "error", "Invalid credentials");
    }
}
