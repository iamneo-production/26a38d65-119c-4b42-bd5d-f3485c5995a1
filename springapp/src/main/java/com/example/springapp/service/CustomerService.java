package com.example.springapp.service;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.model.Customer;
import com.example.springapp.repository.CustomerRepository;

@Service
public class CustomerService {
    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public boolean login(String email, String password) {
        Optional<Customer> optionalCustomer = customerRepository.findByEmailAndPassword(email, password);
        return optionalCustomer.isPresent();
    }

    public Customer getCustomerById(Long customerId) {
        Optional<Customer> optionalCustomer = customerRepository.findById(customerId);

        return optionalCustomer.orElse(null);
    }

    public boolean updateCustomer(Customer customer) {
        Optional<Customer> optionalCustomer = customerRepository.findById(customer.getId());

        if (optionalCustomer.isPresent()) {
            Customer existingCustomer = optionalCustomer.get();
            existingCustomer.setName(customer.getName());
            existingCustomer.setEmail(customer.getEmail());
            existingCustomer.setPassword(customer.getPassword());
            existingCustomer.setAddressId(customer.getAddressId());

            customerRepository.save(existingCustomer);
            return true; 
        }

        return false; 
    }
}
