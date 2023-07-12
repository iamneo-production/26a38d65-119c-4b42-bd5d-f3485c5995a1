package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import main.java.com.example.springapp.model.MenuItem;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    // Additional custom methods can be defined here
}