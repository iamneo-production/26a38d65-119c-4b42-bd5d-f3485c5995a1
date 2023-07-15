<<<<<<< HEAD
package com.example.springapp.controller;
import com.example.springapp.adapter.LocalDateTimeAdapter;
import com.example.springapp.exception.CommentAlreadyExistException;
import com.example.springapp.exception.OrderAlreadyCheckoutException;
import com.example.springapp.exception.OrderAlreadyDeliverException;
import com.example.springapp.exception.OrderNotExistException;
import com.example.springapp.model.Dish;
import com.example.springapp.model.Order;
import com.example.springapp.service.OrderService;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api/order")
public class OrderController {

  @PersistenceContext
  private EntityManager entityManager;

  private final OrderService orderService;

  @Autowired
  public OrderController(OrderService orderService) {
    this.orderService = orderService;
  }

@PostMapping(path = "/addToCart")
@Transactional
public int addOrderToCart(@RequestBody String jsonOrder) {
  Gson gson = new GsonBuilder()
      .registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter())
      .create();

  JSONObject order = new JSONObject(jsonOrder);
  long Id = order.getLong("customerId");
  String customerId = String.valueOf(Id);
  String restaurantId = order.getString("restaurantId");
  JSONArray shopcart = order.getJSONArray("shopcart");
  List<Dish> list = new ArrayList<>();
  Map<Dish, Integer> dishCountMap = new HashMap<>(); // Map to track dish counts
  Set<Dish> dishSet = new HashSet<>(); // Set to track unique dishes

  for (Object object : shopcart) {
    Dish dish = gson.fromJson(object.toString(), Dish.class);

    // Update dish count in the map
    dishCountMap.put(dish, dishCountMap.getOrDefault(dish, 0) + 1);

    // Merge and add dish to the list if it's not already present
    if (!dishSet.contains(dish)) {
      Dish mergedDish = entityManager.merge(dish); // Use merge instead of persist
      list.add(mergedDish);
      dishSet.add(dish);
    }
  }

  // Add dishes to the list based on the dish counts
  for (Map.Entry<Dish, Integer> entry : dishCountMap.entrySet()) {
    Dish dish = entry.getKey();
    int count = entry.getValue();

    for (int i = 0; i < count - 1; i++) {
      if (!list.contains(dish)) { // Check if dish is not already in the list
        Dish mergedDish = entityManager.merge(dish); // Use merge instead of persist
        list.add(mergedDish);
      }
    }
  }

  return orderService.addOrderToCart(customerId, restaurantId, list);
}


  @DeleteMapping(path = "{id}")
  public int deleteOrder(@PathVariable("id") String id)
      throws OrderNotExistException, OrderAlreadyDeliverException {
    int res = orderService.cancelOrder(id);
    if (res == 0) {
      throw new OrderNotExistException("Order doesn't exist");
    }
    if (res == -1) {
      throw new OrderAlreadyDeliverException(
          "Can't cancel order. It is either in delivery or finished");
    }
    return res;
  }

  @PostMapping(path = "/checkoutAll")
  public int checkoutUsers(@RequestBody String jsonOrders)
      throws OrderNotExistException, OrderAlreadyCheckoutException {
    Gson gson = new GsonBuilder()
        .registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter())
        .create();

    JSONObject orders = new JSONObject((jsonOrders));
    JSONArray orderList = orders.getJSONArray("orders");
    List<Order> list = new ArrayList<>();
    for (Object object : orderList) {
      list.add(gson.fromJson(object.toString(), Order.class));
    }
    int res = orderService.checkoutAll(list);
    if (res == 0) {
      throw new OrderNotExistException("Order doesn't exist");
    }
    if (res == -1) {
      throw new OrderAlreadyCheckoutException("Order already checkout");
    }
    return res;
  }


  @PostMapping(path = "/addComment")
  public int addComment(@RequestBody String jsonOrder)
      throws CommentAlreadyExistException, OrderNotExistException {
    JSONObject order = new JSONObject(jsonOrder);
    int cid=order.getInt("orderId");
    String orderId = cid+""; 
    int rating = order.getInt("rating");
    String content = order.getString("content");
    int res = orderService.addComment(orderId, rating, content);
    if (res == 0) throw new CommentAlreadyExistException("Each order can only have one comment");
    if (res == -1) throw new OrderNotExistException("Order doesn't exist");
    return res;
  }

  @DeleteMapping(path = "/deleteComment/{id}")
  public int deleteComment(@PathVariable("id") String id) throws OrderNotExistException {
    int res = orderService.deleteComment(id);
    if (res == -1) throw new OrderNotExistException("Order doesn't exist");
    return res;
  }

  @ResponseStatus(value = HttpStatus.BAD_REQUEST)
  @ExceptionHandler({OrderNotExistException.class, OrderAlreadyDeliverException.class,
      OrderAlreadyCheckoutException.class, CommentAlreadyExistException.class})
  public String handleException(Exception e) {
    return e.getMessage();
  }
}
=======
package com.example.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.example.springapp.model.Order;
import com.example.springapp.service.OrderService;
import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {
    private final OrderService orderService;


    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService=orderService;
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        return orderService.createOrder(order);
    }

    @PutMapping("/{id}")
    public Order updateOrder(@PathVariable Long id, @RequestBody Order updatedOrder) {
        return orderService.updateOrderById(id,updatedOrder);
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {
        orderService.deleteOrderById(id);
    }

    @GetMapping("/customerId")
    public ResponseEntity<List<Order>> getCustomerOrders(@RequestParam("customerId") Long customerId) {
        List<Order> customerOrders = orderService.getOrdersByCustomerId(customerId);
    
        if (!customerOrders.isEmpty()) {
            return ResponseEntity.ok(customerOrders);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/restaurantId")
    public ResponseEntity<List<Order>> getRestaurantOrders(@RequestParam("restaurantId") Long restaurantId) {
        List<Order> restaurantOrders = orderService.getOrdersByRestaurantId(restaurantId);
    
        if (!restaurantOrders.isEmpty()) {
            return ResponseEntity.ok(restaurantOrders);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("/status")
    public ResponseEntity<String> updateOrderStatus(@RequestParam("orderId") Long orderId, @RequestParam("status") String status) {
        boolean updated = orderService.updateOrderStatus(orderId, status);
    
        if (updated) {
            return ResponseEntity.ok("Order status updated");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update order status");
        }
    }
    
}
>>>>>>> Food-Ordering-and-Delivery-Application-malli172
