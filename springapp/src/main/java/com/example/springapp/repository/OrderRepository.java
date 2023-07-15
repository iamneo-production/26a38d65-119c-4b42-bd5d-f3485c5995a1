package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.model.Order;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
  
    List<Order> findByCustomerId(Long customerId);
    List<Order> findByRestaurantId(Long restaurantId);
    
}