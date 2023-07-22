
package com.example.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
<<<<<<< HEAD
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
=======
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


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/restaurant")
public class RestaurantController {

  private final RestaurantServiceImpl restaurantService;
  private final OrderServiceImpl orderService;
  private final SearchEngineServiceImpl searchEngineService;

  @Autowired
  public RestaurantController(RestaurantServiceImpl restaurantService,
      OrderServiceImpl orderService, SearchEngineServiceImpl searchEngineService) {
    this.restaurantService = restaurantService;
    this.orderService = orderService;
    this.searchEngineService = searchEngineService;
  }

  @GetMapping(path = "/all")
  public List<Restaurant> getAllRestaurants() {
    return restaurantService.getUsers();
  }

  @GetMapping(path = "/search/" + "{query}")
  public List<Restaurant> SearchRestaurants(@PathVariable("query") String query) {
    List<Restaurant> res = new ArrayList<>();
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
  public Restaurant getRestaurantById(@PathVariable("id") String id)
      throws UserNotExistException {
    return restaurantService.getUser(id)
        .orElseThrow(() -> new UserNotExistException("User doesn't exist"));
  }

  @PostMapping(path = "/login")
  public Restaurant loginRestaurant(@RequestBody String jsonUser)
      throws UserNotExistException, PasswordNotMatchException {

    JSONObject user = new JSONObject(jsonUser);
    String userName = user.getString("userName");
    String password = user.getString("password");
    Optional<Restaurant> restaurant = restaurantService.getUserByName(userName);
    if (restaurant.isEmpty()) {
      throw new UserNotExistException("User doesn't exist");
    }
    if (!restaurantService.passwordMatch(restaurant.get().getId()+"", password)) {
      throw new PasswordNotMatchException("Password doesn't match");
    }
    return restaurant.get();
  }

  @PostMapping(path = "/register")
  public Restaurant registerRestaurant(@RequestBody String jsonUser)
      throws UserAlreadyExistException {

    JSONObject user = new JSONObject(jsonUser);
    String userName = user.getString("userName");
    String password = user.getString("password");
    String phoneNumber = user.getString("phoneNumber");
    String address = user.getString("address");
    String city = user.getString("city");
    String state = user.getString("state");
    String zip = user.getString("zip");
    Restaurant restaurant = restaurantService
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
>>>>>>> 7af54b8d64aa4f001f5a2c79ea927fc2fba69d2c

import com.example.springapp.model.Restaurant;
import com.example.springapp.service.RestaurantService;

<<<<<<< HEAD
import java.util.List;
=======
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
>>>>>>> 7af54b8d64aa4f001f5a2c79ea927fc2fba69d2c

@RestController
@RequestMapping("/restaurants")
@CrossOrigin(origins="*")
public class RestaurantController {

<<<<<<< HEAD
    @Autowired
    private RestaurantService restaurantService;
=======
  @PostMapping(path = "/updateDishPrice")
public int updateDishPrice(@RequestBody String jsonDish)
    throws UserNotExistException, DishNotExistException {
  JSONObject dish = new JSONObject(jsonDish);
  long restaurantId = dish.getLong("restaurantId");
  String dishName = dish.getString("dishName");
  double newPrice = dish.getDouble("newPrice");

  Optional<Restaurant> restaurant = restaurantService.getUser(String.valueOf(restaurantId));
  if (restaurant.isEmpty()) {
    throw new UserNotExistException("The given restaurant doesn't exist");
  }

  int res = restaurantService.updateDishPrice(String.valueOf(restaurantId), dishName, newPrice);
  if (res == -1) {
    throw new DishNotExistException("The given dish doesn't exist");
  }
  
  return res;
}


  @GetMapping(path = "/information/" + "{id}")
  public RestaurantInfo getRestaurantInformation(@PathVariable("id") String id)
      throws UserNotExistException {
    if (restaurantService.getInformation(id) != null) {
>>>>>>> 7af54b8d64aa4f001f5a2c79ea927fc2fba69d2c

    @PostMapping
    public ResponseEntity<Void> createRestaurant(@RequestBody Restaurant restaurant) {
        restaurantService.createRestaurant(restaurant);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
<<<<<<< HEAD
=======
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
>>>>>>> 7af54b8d64aa4f001f5a2c79ea927fc2fba69d2c

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
    }

    @GetMapping("/{name}")
    public ResponseEntity<Restaurant> getRestaurantByName(@PathVariable String name) {
        Restaurant restaurant = restaurantService.findByRestaurantName(name);
        if (restaurant != null) {
            return ResponseEntity.ok(restaurant);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}