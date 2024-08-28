package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class WelcomeController {

    @GetMapping("/")
    public ModelAndView welcome(){
        return new ModelAndView("welcome");
    }

    @GetMapping("/dashboard")
    public ModelAndView dashboard(){
        return new ModelAndView("dashboard");
    }

    @GetMapping("/lesson1")
    public ModelAndView lesson1(){
        return new ModelAndView("lesson1");
    }

}
