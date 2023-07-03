package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.backend.model.SearchEngine;

@Repository
public interface SearchEngineRepository extends JpaRepository<SearchEngine, Long> {

}
