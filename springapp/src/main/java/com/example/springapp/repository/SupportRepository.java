package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.springapp.model.Support;

@Repository
public interface SupportRepository extends JpaRepository<Support, Long> {
}
