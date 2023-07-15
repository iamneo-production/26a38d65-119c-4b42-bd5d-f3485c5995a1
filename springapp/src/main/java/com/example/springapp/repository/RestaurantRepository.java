<<<<<<< HEAD
<<<<<<< HEAD
package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.springapp.model.Restaurant;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

}

=======
=======
>>>>>>> Food-Ordering-and-Delivery-Application-anjalisingh11062002
package com.example.springapp.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.springapp.model.Restaurant;
import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    Restaurant findByRestaurantName(String name);
<<<<<<< HEAD
}
>>>>>>> Food-Ordering-and-Delivery-Application-malli172
=======
}
>>>>>>> Food-Ordering-and-Delivery-Application-anjalisingh11062002
