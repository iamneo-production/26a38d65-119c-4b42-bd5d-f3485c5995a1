package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.springapp.model.Restaurants;

@Repository
public interface RestaurantsRepository extends JpaRepository<Restaurants, Long> {

}