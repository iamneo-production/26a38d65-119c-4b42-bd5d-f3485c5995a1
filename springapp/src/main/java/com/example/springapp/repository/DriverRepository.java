package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
<<<<<<< HEAD
import com.example.backend.model.Driver;
=======
import com.example.springapp.model.Driver;
>>>>>>> eb340f0c974c790a2fb6351acd3cf1a0f0b889d7


@Repository
public interface DriverRepository extends JpaRepository<Driver, Long> {

}
