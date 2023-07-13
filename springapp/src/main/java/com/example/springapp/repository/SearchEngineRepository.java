package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.springapp.model.SearchEngine;

@Repository
public interface SearchEngineRepository extends JpaRepository<SearchEngine, Long> {

}
