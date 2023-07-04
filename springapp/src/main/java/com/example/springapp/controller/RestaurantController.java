package com.example.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.springapp.model.Restaurant;
import com.example.springapp.service.RestaurantService;

import java.util.List;

@RestController
@RequestMapping("/api/restaurant")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @PostMapping
    public ResponseEntity<Void> createRestaurant(@RequestBody Restaurant restaurant) {
        restaurantService.createRestaurant(restaurant);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Void> updateRestaurant(@RequestBody Restaurant restaurant) {
        restaurantService.updateRestaurant(restaurant);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Restaurant>> getAllRestaurants() {
        List<Restaurant> restaurants = restaurantService.getAllRestaurant();
        return new ResponseEntity<>(restaurants, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> getRestaurantById(@PathVariable Long id) {
        Restaurant restaurant = restaurantService.getRestaurantById(id);
        if (restaurant != null) {
            return new ResponseEntity<>(restaurant, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    return orderService.restaurantGetActiveOrders(id);
  }

    @GetMapping("/{name}")
    public ResponseEntity<Restaurant> getRestaurantByName(@PathVariable String name) {
        Restaurant restaurant = restaurantService.findByRestaurantName(name);
        if (restaurant != null) {
            return ResponseEntity.ok(restaurant);
        } else {
            return ResponseEntity.notFound().build();
        }
    return orderService.restaurantFindPastOrders(id);
  }

  @GetMapping(path = "/menu/" + "{id}")
  public List<Dish> getMenu(@PathVariable("id") String id)
      throws UserNotExistException {
    if (restaurantService.getUser(id).isEmpty()) {
      throw new UserNotExistException("The given restaurant doesn't exist");
    }
    return restaurantService.getAllDishes(id);
  }

  @PostMapping(path = "/addToMenu")
  public int addDishToMenu(@RequestBody String jsonDish)
      throws UserNotExistException {
    JSONObject dish = new JSONObject(jsonDish);
    
   
    long Id = dish.getLong("restaurantId");
    String restaurantId = Id+"";
    String dishName = dish.getString("dishName");
    String imageUrl = dish.getString("imageUrl");
    double price = dish.getDouble("price");
    Dish newDish = new Dish(dishName, price, imageUrl);
    int res = restaurantService.addDish(restaurantId, newDish);
    if (res == -1) {
      throw new UserNotExistException("The given restaurant doesn't exist");
    }
    // handle search engine
    searchEngineService.addRestaurant(dishName, restaurantId);
    return res;
  }

  @PostMapping(path = "/removeDish")
  public int removeDishFromMenu(@RequestBody String jsonDish)
      throws UserNotExistException, DishNotExistException {
    JSONObject dish = new JSONObject(jsonDish);
    long Id = dish.getLong("restaurantId");
    String restaurantId = Id+"";
    Object dishObject = dish.getJSONObject("dish");
    Gson gson = new Gson();
    Dish newDish = gson.fromJson(dishObject.toString(), Dish.class);
    int res = restaurantService.removeDish(restaurantId, newDish);
    if (res == -1) {
      throw new UserNotExistException("The given restaurant doesn't exist");
    }
    if (res == 0) {
      throw new DishNotExistException("The given dish doesn't exist");
    }
    // handle search engine
    searchEngineService.removeRestaurant(newDish.getDishName(), restaurantId);
    return res;
  }

  @GetMapping(path = "/information/" + "{id}")
  public RestaurantInfo getRestaurantInformation(@PathVariable("id") String id)
      throws UserNotExistException {
    if (restaurantService.getInformation(id) != null) {

      return restaurantService.getInformation(id);
      
    }
    throw new UserNotExistException("The given restaurant doesn't exist");
  }

 @PostMapping(path = "/information/")
public int updateRestaurantInformation(@RequestBody String jsonInfo)
    throws UserNotExistException {
  JSONObject object = new JSONObject(jsonInfo);
  int restaurantIdInt = object.getInt("restaurantId");
  String restaurantId = String.valueOf(restaurantIdInt);
  boolean open = object.getBoolean("status");
  String name = object.getString("name");
  String description = object.getString("description");
  String imageUrl = object.getString("imageUrl");
  String tag1 = object.getString("tag1");
  String tag2 = object.getString("tag2");
  String tag3 = object.getString("tag3");
  RestaurantInfo newInfo = new RestaurantInfo(open, name, description, imageUrl, tag1, tag2, tag3);

  // handle search engine
  RestaurantInfo oldInfo = restaurantService.getInformation(restaurantId);
  if (oldInfo != null) {
    searchEngineService.eraseInfo(oldInfo, restaurantId);
  }
  searchEngineService.updateInfo(newInfo, restaurantId);
  int res = restaurantService.updateInfo(restaurantId, newInfo);
  if (res == -1) {
    throw new UserNotExistException("The given restaurant doesn't exist");
  }
  return res;
}

  @DeleteMapping(path = "{id}")
  public int deleterRestaurant(@PathVariable("id") String id)
      throws UserNotExistException, OrderNotFinishedException {
    if (orderService.restaurantGetActiveOrders(id).size() != 0) {
      throw new OrderNotFinishedException("You still have active orders, please finish them first");
    }
    // handle search engine
    RestaurantInfo oldInfo = restaurantService.getInformation(id);
    if (oldInfo != null) {
      searchEngineService.eraseInfo(oldInfo, id);
    }
    List<Dish> dishes = restaurantService.getAllDishes(id);
    if (dishes != null) {
      searchEngineService.eraseDishes(dishes, id);
    }
    int res = restaurantService.deleteUser(id);
    if (res == -1) {
      throw new UserNotExistException("User doesn't exist");
    }
    return res;
  }

  @PostMapping(path = "/resetPassword")
  public int resetPassword(@RequestBody String jsonPassword)
      throws UserNotExistException, PasswordNotMatchException {
    JSONObject object = new JSONObject(jsonPassword);
    String id = object.getString("id");
    String oldPassword = object.getString("oldPassword");
    String newPassword = object.getString("newPassword");
    int res = restaurantService.updatePassword(id, oldPassword, newPassword);
    if (res == -1) {
      throw new UserNotExistException("User doesn't exist");
    }
    if (res == 0) {
      throw new PasswordNotMatchException("Password doesn't match");
    }
    return res;
  }

  @PostMapping(path = "/resetPhone")
  public int resetPhoneNumber(@RequestBody String jsonPhone)
      throws UserNotExistException {
    JSONObject object = new JSONObject(jsonPhone);
    String id = object.getString("id");
    String phoneNumber = object.getString("phoneNumber");
    int res = restaurantService.updatePhoneNumber(id, phoneNumber);
    if (res == -1) {
      throw new UserNotExistException("User doesn't exist");
    }
    return res;
  }

  @PostMapping(path = "/resetAddress")
  public int resetAddress(@RequestBody String jsonAddress)
      throws UserNotExistException {
    JSONObject object = new JSONObject(jsonAddress);
    String id = object.getString("id");
    String address = object.getString("address");
    String city = object.getString("city");
    String state = object.getString("state");
    String zip = object.getString("zip");
    int res = restaurantService.updateAddress(id, address, city, state, zip);
    if (res == -1) {
      throw new UserNotExistException("User doesn't exist");
    }
    return res;
  }

  @GetMapping(path = "/getComments/" + "{id}")
  public List<Comment> findCommentsByRestaurant(@PathVariable("id") String id)
      throws UserNotExistException {
    Optional<Restaurant> restaurantOptional = restaurantService.getUser(id);
    if (restaurantOptional.isEmpty()) throw new UserNotExistException("User doesn't exist");
    return orderService.restaurantGetComments(id);
  }

  @ResponseStatus(value = HttpStatus.BAD_REQUEST)
  @ExceptionHandler({UserNotExistException.class, PasswordNotMatchException.class,
      UserAlreadyExistException.class, DishNotExistException.class,
      OrderNotFinishedException.class})
  public String handleException(Exception e) {
    return e.getMessage();
  }
}
