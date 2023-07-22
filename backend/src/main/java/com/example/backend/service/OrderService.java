package com.example.backend.service;

import com.example.backend.model.Comment;
import com.example.backend.model.Dish;
import com.example.backend.model.Order;

import java.util.List;
import java.util.Optional;

public interface OrderService {

  int addOrderToCart(String customerId, String restaurantId, List<Dish> content);

  int checkoutOrder(String id);

  int checkoutAll(List<Order> orders);

  int cancelOrder(String id);

  Optional<Order> getOrder(String id);

  int acceptOrder(String id, String driverId);

  int finishOrder(String id);

  List<Order> customerCart(String customerId);

  List<Order> customerGetActiveOrders(String customerId);

  List<Order> customerFindPastOrders(String customerId);

  List<Order> getAllPendingOrders();

  Order driverGetActiveOrder(String driverId);

  List<Order> driverFindPastOrders(String driverId);

  List<Order> restaurantGetActiveOrders(String restaurantId);

  List<Order> restaurantFindPastOrders(String restaurantId);

  int addComment(String id, int rating, String content);

  int deleteComment(String id);

  List<Comment> restaurantGetComments(String restaurantId);
}
