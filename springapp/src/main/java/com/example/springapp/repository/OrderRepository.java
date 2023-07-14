package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
    // Additional custom methods can be defined here
}