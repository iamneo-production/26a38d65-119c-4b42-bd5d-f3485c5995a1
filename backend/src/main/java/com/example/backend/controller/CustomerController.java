package com.example.backend.controller;
import com.example.backend.model.Customer;
import com.example.backend.model.Order;
import com.example.backend.service.CustomerServiceImpl;
import com.example.backend.service.OrderServiceImpl;
import com.example.backend.exception.OrderNotFinishedException;
import com.example.backend.exception.PasswordNotMatchException;
import com.example.backend.exception.UserAlreadyExistException;
import com.example.backend.exception.UserNotExistException;
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

@CrossOrigin(origins="http://localhost:8081")
@RestController
@RequestMapping("/api/customer")
public class CustomerController {
  
  private final CustomerServiceImpl customerService;
  private final OrderServiceImpl orderService;

  @Autowired
  public CustomerController(CustomerServiceImpl customerService, OrderServiceImpl orderService) {
    this.customerService = customerService;
    this.orderService = orderService;
  }

  // Mapping for getting customer by ID
  @GetMapping(path = "{id}")
  public Customer getCustomerById(@PathVariable("id") String id)
      throws UserNotExistException {
    return customerService.getUser(id)
        .orElseThrow(() -> new UserNotExistException("User doesn't exist"));
  }

  // Mapping for customer login
  @PostMapping(path = "/login")
  public Customer loginCustomer(@RequestBody String jsonUser)
      throws UserNotExistException, PasswordNotMatchException {
    // Parse the JSON request body
    JSONObject user = new JSONObject(jsonUser);
    String userName = user.getString("userName");
    String password = user.getString("password");
    Optional<Customer> customer = customerService.getUserByName(userName);
    if (customer.isEmpty()) {
      throw new UserNotExistException("User doesn't exist");
    }
    if (!customerService.passwordMatch(customer.get().getId()+"", password)) {
      throw new PasswordNotMatchException("Password doesn't match");
    }
    return customer.get();
  }

<<<<<<< HEAD
  // Mapping for customer registration
=======
  // Mapping for customer registration--
>>>>>>> Food-Ordering-and-Delivery-Application-malli172
  @PostMapping(path = "/register")
  public Customer registerCustomer(@RequestBody String jsonUser)
      throws UserAlreadyExistException {
    // Parse the JSON request body
    JSONObject user = new JSONObject(jsonUser);
    String userName = user.getString("userName");
    String password = user.getString("password");
    String phoneNumber = user.getString("phoneNumber");
    String address = user.getString("address");
    String city = user.getString("city");
    String state = user.getString("state");
    String zip = user.getString("zip");
    Customer customer = customerService
        .addUser(userName, password, phoneNumber, address, city, state, zip);
    if (customer == null) {
      throw new UserAlreadyExistException("User already exists, please login");
    }
    return customer;
  }

  // Mapping for customer logout
  @PostMapping(path = "/logout")
  public int logoutCustomer() {
    System.out.println("logout the user");
    return 1;
  }

  // Mapping for getting customer's shopping cart
  @GetMapping(path = "/myCart/{id}")
  public List<Order> getShoppingCart(@PathVariable("id") String id)
      throws UserNotExistException {
    if (customerService.getUser(id).isEmpty()) {
      throw new UserNotExistException("User doesn't exist");
    }
    return orderService.customerCart(id);
  }

  // Mapping for getting customer's active orders
  @GetMapping(path = "/myActiveOrders/{id}")
  public List<Order> getActiveOrders(@PathVariable("id") String id)
      throws UserNotExistException {
    if (customerService.getUser(id).isEmpty()) {
      throw new UserNotExistException("User doesn't exist");
    }
    return orderService.customerGetActiveOrders(id);
  }

  // Mapping for getting customer's order history
  @GetMapping(path = "/myOrderHistory/{id}")
  public List<Order> getOrderHistory(@PathVariable("id") String id)
      throws UserNotExistException {
    if (customerService.getUser(id).isEmpty()) {
      throw new UserNotExistException("User doesn't exist");
    }
    return orderService.customerFindPastOrders(id);
  }

  // Mapping for deleting a customer
  @DeleteMapping(path = "{id}")
  public int deleterCustomer(@PathVariable("id") String id)
      throws UserNotExistException, OrderNotFinishedException {
    if (orderService.customerGetActiveOrders(id).size() != 0) {
      throw new OrderNotFinishedException("You still have active orders, please finish them first");
    }
    int res = customerService.deleteUser(id);
    if (res == -1) {
      throw new UserNotExistException("User doesn't exist");
    }
    return res;
  }

  // Mapping for resetting customer's password
  @PostMapping(path = "/resetPassword")
  public int resetPassword(@RequestBody String jsonPassword)
      throws UserNotExistException, PasswordNotMatchException {
    // Parse the JSON request body
    JSONObject object = new JSONObject(jsonPassword);
    int cid=object.getInt("id");
    String id = cid+"";
    String password = object.getString("password");
    String newPassword = object.getString("newPassword");
    int res = customerService.updatePassword(id, password, newPassword);
    if (res == -1) {
      throw new UserNotExistException("User doesn't exist");
    }
    if (res == 0) {
      throw new PasswordNotMatchException("Password doesn't match");
    }
    return res;
  }

  // Mapping for resetting customer's phone number
  @PostMapping(path = "/resetPhone")
  public int resetPhoneNumber(@RequestBody String jsonPhone)
      throws UserNotExistException {
    // Parse the JSON request body
    JSONObject object = new JSONObject(jsonPhone);
    int cid=object.getInt("id");
    String id = cid+"";
    String phoneNumber = object.getString("phoneNumber");
    int res = customerService.updatePhoneNumber(id, phoneNumber);
    if (res == -1) {
      throw new UserNotExistException("User doesn't exist");
    }
    return res;
  }

  // Mapping for resetting customer's address
  @PostMapping(path = "/resetAddress")
  public int resetAddress(@RequestBody String jsonAddress)
      throws UserNotExistException {
    // Parse the JSON request body
    JSONObject object = new JSONObject(jsonAddress);
    int cid=object.getInt("id");
    String id = cid+"";
    String address = object.getString("address");
    String city = object.getString("city");
    String state = object.getString("state");
    String zip = object.getString("zip");
    int res = customerService.updateAddress(id, address, city, state, zip);
    if (res == -1) {
      throw new UserNotExistException("User doesn't exist");
    }
    return res;
  }

  // Exception handler for handling custom exceptions
  @ResponseStatus(value = HttpStatus.BAD_REQUEST)
  @ExceptionHandler({UserNotExistException.class, PasswordNotMatchException.class,
      UserAlreadyExistException.class, OrderNotFinishedException.class})
  public String handleException(Exception e) {
    return e.getMessage();
  }
}
