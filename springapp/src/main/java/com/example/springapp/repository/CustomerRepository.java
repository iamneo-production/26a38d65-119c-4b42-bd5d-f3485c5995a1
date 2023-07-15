<<<<<<< HEAD
<<<<<<< HEAD
package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.springapp.model.Customer;


@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

}
=======
package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.springapp.model.Customer;


@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

}
>>>>>>> Food-Ordering-and-Delivery-Application-malli172
=======
package com.example.springapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    // Optional<Customer> findByEmailAndPassword(String email, String password);
}
>>>>>>> Food-Ordering-and-Delivery-Application-anjalisingh11062002
