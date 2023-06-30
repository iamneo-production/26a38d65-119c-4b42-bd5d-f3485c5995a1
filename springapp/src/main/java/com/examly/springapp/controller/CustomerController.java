package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Customer;
import com.examly.springapp.service.CustomerService;

@RestController
@RequestMapping("/")
public class CustomerController {

    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping("/customer")
    public ResponseEntity<String> registerCustomer(@RequestBody Customer customer) {
        customerService.registerCustomer(customer);
        return ResponseEntity.ok("Customer created");
    }

    // Add other endpoints for additional functionality

}

