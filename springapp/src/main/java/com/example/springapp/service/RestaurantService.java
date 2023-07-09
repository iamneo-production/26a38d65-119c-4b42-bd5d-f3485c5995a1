<<<<<<< HEAD
package com.example.springapp.service;

import com.example.springapp.model.Dish;
import com.example.springapp.model.RestaurantInfo;
import java.util.List;

public interface RestaurantService {

  int addDish(String id, Dish dish);

  int removeDish(String id, Dish dish);

  List<Dish> getAllDishes(String id);

  RestaurantInfo getInformation(String id);

  int updateInfo(String id, RestaurantInfo info);
}
=======
package com.example.springapp.service;

import org.springframework.stereotype.Service;

import com.example.springapp.model.Restaurant;
import com.example.springapp.repository.RestaurantRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;

    public RestaurantService(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    public void createRestaurant(Restaurant restaurant) {
        restaurantRepository.save(restaurant);
    }

    public void updateRestaurant(Restaurant restaurant) {
        restaurantRepository.save(restaurant);
    }

    public List<Restaurant> getAllRestaurant() {
        return restaurantRepository.findAll();
    }

    public Restaurant getRestaurantById(Long id) {
        return restaurantRepository.findById(id).orElse(null);
    }

    public Restaurant findByRestaurantName(String name) {
        return restaurantRepository.findByRestaurantName(name);
    }
}
>>>>>>> Food-Ordering-and-Delivery-Application-malli172
