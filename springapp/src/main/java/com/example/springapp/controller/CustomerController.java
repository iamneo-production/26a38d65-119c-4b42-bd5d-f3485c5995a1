package com.example.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.springapp.model.Customer;
import com.example.springapp.service.CustomerService;

@RestController
@RequestMapping("/customer")
public class CustomerController {
    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping
    public ResponseEntity<String> registerCustomer(@RequestBody Customer customer) {
        Customer createdCustomer = customerService.createCustomer(customer);
        return new ResponseEntity<>("Customer created", HttpStatus.CREATED);
    }

    @PostMapping("/login")
public ResponseEntity<String> loginCustomer(@RequestBody Customer request) {
    boolean loginSuccessful = customerService.login(request.getEmail(), request.getPassword());
    if (loginSuccessful) {
        return ResponseEntity.ok("Login successful");
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
}

@PostMapping(path = "/logout")
  public int logoutRestaurant() {
    System.out.println("logout the user");
    return 1;
  }

  @GetMapping("/id")
public ResponseEntity<Customer> getCustomerProfile(@RequestParam("id") Long customerId) {
    Customer customer = customerService.getCustomerById(customerId);

    if (customer != null) {
        return ResponseEntity.ok(customer);
    } else {
        return ResponseEntity.notFound().build();
    }
}

@PutMapping
public ResponseEntity<String> updateCustomerProfile(@RequestBody Customer customer) {
    boolean updated = customerService.updateCustomer(customer);

    if (updated) {
        return ResponseEntity.ok("Customer profile updated successfully");
    } else {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update customer profile");
    }
}


}
