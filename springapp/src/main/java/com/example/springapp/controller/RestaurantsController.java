package com.example.springapp.controller;

import com.example.springapp.exception.DishNotExistException;
import com.example.springapp.exception.OrderNotFinishedException;
import com.example.springapp.exception.PasswordNotMatchException;
import com.example.springapp.exception.UserAlreadyExistException;
import com.example.springapp.exception.UserNotExistException;
import com.example.springapp.model.Comment;
import com.example.springapp.model.Dish;
import com.example.springapp.model.Orders;
import com.example.springapp.model.Restaurants;
import com.example.springapp.model.RestaurantInfo;
import com.example.springapp.service.OrderServiceImpl;
import com.example.springapp.service.RestaurantServiceImpl;
import com.example.springapp.service.SearchEngineServiceImpl;
import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins="https://8081-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io")
@RestController
@RequestMapping("/restaurant")
public class RestaurantsController {

  private final RestaurantServiceImpl restaurantService;
  private final OrderServiceImpl orderService;
  private final SearchEngineServiceImpl searchEngineService;

  @Autowired
  public RestaurantsController(RestaurantServiceImpl restaurantService,
      OrderServiceImpl orderService, SearchEngineServiceImpl searchEngineService) {
    this.restaurantService = restaurantService;
    this.orderService = orderService;
    this.searchEngineService = searchEngineService;
  }

  @GetMapping(path = "/all")
  public List<Restaurants> getAllRestaurants() {
    return restaurantService.getUsers();
  }

  @GetMapping("/count")
  public int getTotalNumberOfRestaurants() {
    return restaurantService.getTotalNumberOfRestaurants();
  }

  @GetMapping(path = "/search/" + "{query}")
  public List<Restaurants> SearchRestaurants(@PathVariable("query") String query) {
    List<Restaurants> res = new ArrayList<>();
    List<String> ids = searchEngineService.searchRestaurant(query);
    if (ids != null) {
      for (String id : ids) {
        if (restaurantService.getUser(id).isPresent()) {
          res.add(restaurantService.getUser(id).get());
        }
      }
    }
    return res;
  }

  @GetMapping(path = "{id}")
  public Restaurants getRestaurantById(@PathVariable("id") String id)
      throws UserNotExistException {
    return restaurantService.getUser(id)
        .orElseThrow(() -> new UserNotExistException("User doesn't exist"));
  }

  @PostMapping(path = "/login")
  public Restaurants loginRestaurant(@RequestBody String jsonUser)
      throws UserNotExistException, PasswordNotMatchException {

    JSONObject user = new JSONObject(jsonUser);
    String userName = user.getString("userName");
    String password = user.getString("password");
    Optional<Restaurants> restaurant = restaurantService.getUserByName(userName);
    if (restaurant.isEmpty()) {
      throw new UserNotExistException("User doesn't exist");
    }
    if (!restaurantService.passwordMatch(restaurant.get().getId()+"", password)) {
      throw new PasswordNotMatchException("Password doesn't match");
    }
    return restaurant.get();
  }

  @PostMapping(path = "/register")
  public Restaurants registerRestaurant(@RequestBody String jsonUser)
      throws UserAlreadyExistException {

    JSONObject user = new JSONObject(jsonUser);
    String userName = user.getString("userName");
    String password = user.getString("password");
    String phoneNumber = user.getString("phoneNumber");
    String address = user.getString("address");
    String city = user.getString("city");
    String state = user.getString("state");
    String zip = user.getString("zip");
    Restaurants restaurant = restaurantService
        .addUser(userName, password, phoneNumber, address, city, state, zip);
    if (restaurant == null) {
      throw new UserAlreadyExistException("User already exists, please login");
    }
    return restaurant;
  }

  @PostMapping(path = "/logout")
  public int logoutRestaurant() {
    System.out.println("logout the user");
    return 1;
  }

  @GetMapping(path = "/myActiveOrders/" + "{id}")
  public List<Orders> getActiveOrders(@PathVariable("id") String id)
      throws UserNotExistException {
    if (restaurantService.getUser(id).isEmpty()) {
      throw new UserNotExistException("The given restaurant doesn't exist");
    }
    return orderService.restaurantGetActiveOrders(id);
  }

  @GetMapping(path = "/myOrderHistory/" + "{id}")
  public List<Orders> getOrderHistory(@PathVariable("id") String id)
      throws UserNotExistException {
    if (restaurantService.getUser(id).isEmpty()) {
      throw new UserNotExistException("The given restaurant doesn't exist");
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
    Optional<Restaurants> restaurantOptional = restaurantService.getUser(id);
    if (restaurantOptional.isEmpty()) throw new UserNotExistException("User doesn't exist");
    return orderService.restaurantGetComments(id);
  }
  @GetMapping(path = "/username/{username}")
  public boolean doesUsernameExist(@PathVariable("username") String username) {
    Optional<Restaurants> restaurant = restaurantService.getUserByName(username);
      return restaurant.isPresent();
  }
  @PostMapping(path = "/updateDishPrice")
  public int updateDishPrice(@RequestBody String jsonDish)
      throws UserNotExistException, DishNotExistException {
    JSONObject dish = new JSONObject(jsonDish);
    long restaurantId = dish.getLong("restaurantId");
    String dishName = dish.getString("dishName");
    double newPrice = dish.getDouble("newPrice");
  
    Optional<Restaurants> restaurant = restaurantService.getUser(String.valueOf(restaurantId));
    if (restaurant.isEmpty()) {
      throw new UserNotExistException("The given restaurant doesn't exist");
    }
  
    int res = restaurantService.updateDishPrice(String.valueOf(restaurantId), dishName, newPrice);
    if (res == -1) {
      throw new DishNotExistException("The given dish doesn't exist");
    }
    
    return res;
    }
  @ResponseStatus(value = HttpStatus.BAD_REQUEST)
  @ExceptionHandler({UserNotExistException.class, PasswordNotMatchException.class,
      UserAlreadyExistException.class, DishNotExistException.class,
      OrderNotFinishedException.class})
  public String handleException(Exception e) {
    return e.getMessage();
  }
}