<<<<<<< HEAD
package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.springapp.model.Order;


@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

}
=======
package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
>>>>>>> Food-Ordering-and-Delivery-Application-malli172
