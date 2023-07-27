package com.example.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.example.springapp.model.Order;
import com.example.springapp.service.OrderService;
import java.util.List;


@RestController
@RequestMapping("/res_order")
@CrossOrigin(origins="https://8081-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io")
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