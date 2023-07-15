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
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
<<<<<<< HEAD
}
>>>>>>> Food-Ordering-and-Delivery-Application-malli172
=======
  
    List<Order> findByCustomerId(Long customerId);
    List<Order> findByRestaurantId(Long restaurantId);
}
>>>>>>> Food-Ordering-and-Delivery-Application-malli172
