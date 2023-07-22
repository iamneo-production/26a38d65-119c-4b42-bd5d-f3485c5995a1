
package com.example.springapp.controller;
<<<<<<< HEAD
=======
import com.example.springapp.adapter.LocalDateTimeAdapter;
import com.example.springapp.exception.CommentAlreadyExistException;
import com.example.springapp.exception.OrderAlreadyCheckoutException;
import com.example.springapp.exception.OrderAlreadyDeliverException;
import com.example.springapp.exception.OrderNotExistException;
import com.example.springapp.model.Dish;
import com.example.springapp.model.Order;
import com.example.springapp.service.OrderServiceImpl;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
>>>>>>> 7af54b8d64aa4f001f5a2c79ea927fc2fba69d2c

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.example.springapp.model.Order;
import com.example.springapp.service.OrderService;
import java.util.List;

<<<<<<< HEAD

@RestController
@RequestMapping("/res_order")
@CrossOrigin(origins="*")
=======
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/order")
>>>>>>> 7af54b8d64aa4f001f5a2c79ea927fc2fba69d2c
public class OrderController {
    private final OrderService orderService;

<<<<<<< HEAD

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService=orderService;
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
=======
  @PersistenceContext
  private EntityManager entityManager;

  private final OrderServiceImpl orderService;

  @Autowired
  public OrderController(OrderServiceImpl orderService) {
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
  Map<Dish, Integer> dishCountMap = new HashMap<>(); 
  Set<Dish> dishSet = new HashSet<>(); 

  for (Object object : shopcart) {
    Dish dish = gson.fromJson(object.toString(), Dish.class);

    dishCountMap.put(dish, dishCountMap.getOrDefault(dish, 0) + 1);

    if (!dishSet.contains(dish)) {
      Dish mergedDish = entityManager.merge(dish); 
      list.add(mergedDish);
      dishSet.add(dish);
    }
  }

  
  for (Map.Entry<Dish, Integer> entry : dishCountMap.entrySet()) {
    Dish dish = entry.getKey();
    int count = entry.getValue();

    for (int i = 0; i < count - 1; i++) {
      if (!list.contains(dish)) {
        Dish mergedDish = entityManager.merge(dish); 
        list.add(mergedDish);
      }
>>>>>>> 7af54b8d64aa4f001f5a2c79ea927fc2fba69d2c
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
