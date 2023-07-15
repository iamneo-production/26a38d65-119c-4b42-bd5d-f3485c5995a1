package com.example.springapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    // Optional<Customer> findByEmailAndPassword(String email, String password);
}
