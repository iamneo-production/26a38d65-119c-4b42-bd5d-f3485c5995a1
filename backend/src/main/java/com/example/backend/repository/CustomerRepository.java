package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.backend.model.Customer;


@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

}
