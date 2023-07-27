package com.example.springapp.service;


import com.example.springapp.model.Dish;
import com.example.springapp.model.Restaurants;
import com.example.springapp.model.RestaurantInfo;
import com.example.springapp.repository.RestaurantsRepository;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RestaurantServiceImpl implements UserService<Restaurants> {

  @Autowired
  private RestaurantsRepository restaurantRepository;

  @Autowired
  private PasswordService passwordService ;



  public int addDish(String id, Dish dish) {
    Optional<Restaurants> restaurant = this.getUser(id);
    if (restaurant.isPresent()) {
      Set<Dish> set;
      if (restaurant.get().getMenu() == null) {
        set = new HashSet<>();
      } else {
        set = new HashSet<>(restaurant.get().getMenu());
      }
      set.add(dish);
      restaurant.get().setMenu(new ArrayList<>(set));
      restaurantRepository.save(restaurant.get());

      return 1;
    }
    return -1;
  }

  public int getTotalNumberOfRestaurants() {
    return (int) restaurantRepository.count();
  }
  
  public int removeDish(String id, Dish dish) {
    Optional<Restaurants> restaurant = this.getUser(id);
    if (restaurant.isPresent()) {
      List<Dish> temp = restaurant.get().getMenu();
      if (temp.contains(dish)) {
        temp.remove(dish);
        restaurant.get().setMenu(temp);
        restaurantRepository.save(restaurant.get());        
        return 1;
      } else {
        return 0;
      }
    }
    return -1;
  }

  public int updateDishPrice(String restaurantId, String dishName, double newPrice) {
    long number = Long.parseLong(restaurantId);
    Optional<Restaurants> restaurantOptional = restaurantRepository.findById(number);
    if (restaurantOptional.isPresent()) {
      Restaurants restaurant = restaurantOptional.get();
      List<Dish> menu = restaurant.getMenu();
      for (Dish dish : menu) {
        if (dish.getDishName().equals(dishName)) {
          dish.setPrice(newPrice);
          restaurantRepository.save(restaurant);
          return 1;
        }
      }
      return 0; 
    } else {
      return -1; 
    }
  }

  public List<Dish> getAllDishes(String id) {
    Optional<Restaurants> restaurant = this.getUser(id);
    
    return restaurant.map(Restaurants::getMenu).orElse(null);
  }


  public RestaurantInfo getInformation(String id) {
    Optional<Restaurants> restaurant = this.getUser(id);
    if (restaurant.isPresent()) {
      if (restaurant.get().getInformation() == null) {
        return new RestaurantInfo();
      } else {
        return restaurant.get().getInformation();
      }
    }
    return null;
  }


  public int updateInfo(String id, RestaurantInfo info) {
    Optional<Restaurants> restaurant = this.getUser(id);
    if (restaurant.isPresent()) {

      restaurant.get().setInformation(info);
      restaurantRepository.save(restaurant.get());
      return 1;
    }
    return -1;
  }

  @Override
  public Restaurants addUser(String userName, String password, String phoneNumber, String address,
      String city, String state, String zip) {
    if (this.getUserIdByName(userName) == null) {
      String newPassword = passwordService.generatePassword(password);
      Restaurants restaurant = new Restaurants(userName, newPassword, phoneNumber, address, city, state,zip);
      restaurantRepository.save(restaurant);
      return restaurant;
    }
    return null;
  }

  @Override
  public int deleteUser(String id) {
    long number = Long.parseLong(id);
    if (this.getUser(id).isPresent()) {
      restaurantRepository.deleteById(number);
      return 1;
    }    
    return -1;
  }

  @Override
  public Optional<Restaurants> getUser(String id) {
    long number = Long.parseLong(id);
    if (id != null) {
      return restaurantRepository.findById(number);
    }
    return Optional.empty();
  }

  @Override
  public String getUserIdByName(String userName) {
    List<Restaurants> restaurants = this.getUsers();
    for (Restaurants restaurant : restaurants) {
      if (restaurant.getUserName().equals(userName)) {
        return restaurant.getId()+"";
      }
    }
    return null;
  }

  
  @Override
  public Optional<Restaurants> getUserByName(String userName) {
    return this.getUser(getUserIdByName(userName));
  }

  @Override
  public List<Restaurants> getUsers() {
    return restaurantRepository.findAll();
  }

  @Override
  public boolean passwordMatch(String id, String password) {
    Optional<Restaurants> restaurant = this.getUser(id);
    return restaurant.isPresent() && passwordService.passwordMatch(password, restaurant.get().getPassword());
  }

  @Override
  public int updatePassword(String id, String oldPassword, String newPassword) {
    Optional<Restaurants> restaurant = this.getUser(id);
    if (restaurant.isPresent()) {
      if (this.passwordMatch(id, oldPassword)) {
        restaurant.get().setPassword(passwordService.generatePassword(newPassword));
        restaurantRepository.save(restaurant.get());
        return 1;
      } else {
        return 0;
      }
    }
    return -1;
  }

  @Override
  public int updatePhoneNumber(String id, String newNumber) {
    Optional<Restaurants> restaurant = this.getUser(id);
    if (restaurant.isPresent()) {
      restaurant.get().setPhoneNumber(newNumber);
      restaurantRepository.save(restaurant.get());
      return 1;
    }
    return -1;
  }

  @Override
  public int updateAddress(String id, String address, String city, String state,
      String zip) {
    Optional<Restaurants> restaurant = this.getUser(id);
    if (restaurant.isPresent()) {
      restaurant.get().setAddress(address);
      restaurant.get().setCity(city);
      restaurant.get().setState(state);
      restaurant.get().setZip(zip);
      restaurantRepository.save(restaurant.get());
      return 1;
    }
    return -1;
  }
}
