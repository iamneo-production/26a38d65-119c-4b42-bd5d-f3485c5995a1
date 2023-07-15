<<<<<<< HEAD
<<<<<<< HEAD
package com.example.springapp.service;

import com.example.springapp.model.Dish;
import com.example.springapp.model.RestaurantInfo;
import java.util.List;


public interface SearchEngineService {
    void addRestaurant(String word, String restaurantId);
    List<String> searchRestaurant(String word);
    void removeRestaurant(String word, String restaurantId);
    void eraseInfo(RestaurantInfo info, String restaurantId);
    void eraseDishes(List<Dish> dishes, String restaurantId);
    void updateInfo(RestaurantInfo info, String restaurantId);
}
=======
=======
>>>>>>> Food-Ordering-and-Delivery-Application-anjalisingh11062002
package com.example.springapp.service;

import com.example.springapp.model.Dish;
import com.example.springapp.model.RestaurantInfo;
import java.util.List;


public interface SearchEngineService {
    void addRestaurant(String word, String restaurantId);
    List<String> searchRestaurant(String word);
    void removeRestaurant(String word, String restaurantId);
    void eraseInfo(RestaurantInfo info, String restaurantId);
    void eraseDishes(List<Dish> dishes, String restaurantId);
    void updateInfo(RestaurantInfo info, String restaurantId);
}
<<<<<<< HEAD
>>>>>>> Food-Ordering-and-Delivery-Application-malli172
=======
>>>>>>> Food-Ordering-and-Delivery-Application-anjalisingh11062002
