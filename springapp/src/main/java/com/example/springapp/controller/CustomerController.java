package com.example.springapp.controller;
import com.example.springapp.model.Customer;
import com.example.springapp.model.Orders;
import com.example.springapp.service.CustomerService;
import com.example.springapp.service.OrderServiceImpl;
import com.example.springapp.exception.OrderNotFinishedException;
import com.example.springapp.exception.PasswordNotMatchException;
import com.example.springapp.exception.UserAlreadyExistException;
import com.example.springapp.exception.UserNotExistException;
import com.example.springapp.exception.DishNotExistException;
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
@RequestMapping("/customer")
public class CustomerController {
  
  private final CustomerService customerService;
  private final OrderServiceImpl orderService;

  @Autowired
  public CustomerController(CustomerService customerService, OrderServiceImpl orderService) {
    this.customerService = customerService;
    this.orderService = orderService;
  }

  @GetMapping(path = "{id}")
  public Customer getCustomerById(@PathVariable("id") String id)
      throws UserNotExistException {
    return customerService.getUser(id)
        .orElseThrow(() -> new UserNotExistException("User doesn't exist"));
  }

  @PostMapping(path = "/login")
  public Customer loginCustomer(@RequestBody String jsonUser)
      throws UserNotExistException, PasswordNotMatchException {
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
  
  @GetMapping("/count")
  public int getTotalNumberOfCustomers() {
    return customerService.getTotalNumberOfCustomers();
  }

  @GetMapping("/all")
  public List<Customer> getAllCustomers() {
    return customerService.getAllUsers();
  }

  @PostMapping(path = "/register")
  public Customer registerCustomer(@RequestBody String jsonUser)
      throws UserAlreadyExistException {
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

  @PostMapping(path = "/logout")
  public int logoutCustomer() {
    System.out.println("logout the user");
    return 1;
  }

  @GetMapping(path = "/myCart/{id}")
  public List<Orders> getShoppingCart(@PathVariable("id") String id)
      throws UserNotExistException {
    if (customerService.getUser(id).isEmpty()) {
      throw new UserNotExistException("User doesn't exist");
    }
    return orderService.customerCart(id);
  }

  @GetMapping(path = "/myActiveOrders/{id}")
  public List<Orders> getActiveOrders(@PathVariable("id") String id)
      throws UserNotExistException {
    if (customerService.getUser(id).isEmpty()) {
      throw new UserNotExistException("User doesn't exist");
    }
    return orderService.customerGetActiveOrders(id);
  }

  @GetMapping(path = "/myOrderHistory/{id}")
  public List<Orders> getOrderHistory(@PathVariable("id") String id)
      throws UserNotExistException {
    if (customerService.getUser(id).isEmpty()) {
      throw new UserNotExistException("User doesn't exist");
    }
    return orderService.customerFindPastOrders(id);
  }

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



  @PostMapping(path = "/resetPassword")
  public int resetPassword(@RequestBody String jsonPassword)
      throws UserNotExistException, PasswordNotMatchException {
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

  @PostMapping(path = "/resetPhone")
  public int resetPhoneNumber(@RequestBody String jsonPhone)
      throws UserNotExistException {
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

  @PostMapping(path = "/resetAddress")
  public int resetAddress(@RequestBody String jsonAddress)
      throws UserNotExistException {
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

  @ResponseStatus(value = HttpStatus.BAD_REQUEST)
  @ExceptionHandler({UserNotExistException.class, PasswordNotMatchException.class,
      UserAlreadyExistException.class, DishNotExistException.class,
      OrderNotFinishedException.class})
  public String handleException(Exception e) {
    return e.getMessage();
  }
}