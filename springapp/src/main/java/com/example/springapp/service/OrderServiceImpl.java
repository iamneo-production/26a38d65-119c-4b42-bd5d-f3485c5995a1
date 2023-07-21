
package com.example.springapp.service;


import com.example.springapp.model.Comment;
import com.example.springapp.model.Dish;
import com.example.springapp.model.Orders;
import com.example.springapp.repository.OrdersRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl {

  @Autowired
  OrdersRepository orderRepository;


  public int addOrderToCart(String customerId, String restaurantId, List<Dish> content) {
    List<Orders> currentCart = this.customerCart(customerId);
    for (Orders o : currentCart) {
      if (o.getRestaurantId().equals(restaurantId)) {
        List<Dish> menu = o.getContent();
        menu.addAll(content);
        double price = 0;
        for (Dish dish : menu) {
          price += dish.getPrice();
        }
        o.setPrice(price);
        orderRepository.save(o);
        System.out.println("Order added to the cart");
        return 1;
      }
    }
    Orders order = new Orders();
    order.setCustomerId(customerId);
    order.setRestaurantId(restaurantId);
    order.setContent(content);
    double price = 0;
    for (Dish dish : content) {
      price += dish.getPrice();
    }
    order.setPrice(price);
    orderRepository.save(order);
    System.out.println("Order added to the cart");
    return 1;
  }

  
  public int checkoutOrder(String id) {
    Optional<Orders> order = getOrder(id);
    if (order.isEmpty()) {
      System.out.println("Order doesn't exist");
      return 0;
    }
    if (order.get().getStartTime() == null) {
      order.get().setStartTime(LocalDateTime.now());
      orderRepository.save(order.get());
      System.out.println("Order checkouts");
      return 1;
    }
    System.out.println("Order already checkout");
    return -1;
  }


  public int checkoutAll(List<Orders> orders) {
    for (Orders order : orders) {
      String id = order.getId()+"";
      int res = checkoutOrder(id);
      if (res == 0) {
        return 0;
      }
      if (res == -1) {
        return -1;
      }
    }
    return 1;
  }

 
  public int cancelOrder(String id) {
    long number = Long.parseLong(id);
    Optional<Orders> order = getOrder(id);
    if (order.isEmpty()) {
      System.out.println("Order doesn't exist");
      return 0;
    }
    if (!order.get().isDelivery()) {
      orderRepository.deleteById(number);
      System.out.println("Order canceled");
      return 1;
    }
    System.out.println("Can't cancel order. It is either in delivery or finished");
    return -1;
  }


  public Optional<Orders> getOrder(String id) {
    long number = Long.parseLong(id);
    if (id != null) {
      return orderRepository.findById(number);
    }
    return Optional.empty();
  }

 
  public int acceptOrder(String id, String driverId) {
    Optional<Orders> orderOrNot = getOrder(id);
    if (orderOrNot.isPresent()) {
      Orders order = orderOrNot.get();
      if (order.getStartTime() != null && !order.isDelivery()) {
        order.setDelivery(true);
        order.setDriverId(driverId);
        orderRepository.save(order);
        System.out.println("Driver accepts the order");
        return 1;
      } else {
        System.out.println("The order can't be accepted");
        return 0;
      }
    }
    System.out.println("The order doesn't exist");
    return -1;
  }

  
  public int finishOrder(String id) {
    Optional<Orders> orderOrNot = getOrder(id);
    if (orderOrNot.isPresent()) {
      Orders order = orderOrNot.get();
      if (order.isDelivery() && order.getEndTime() == null) {
        order.setEndTime(LocalDateTime.now());
        orderRepository.save(order);
        System.out.println("Driver finishes the order");
        return 1;
      } else {
        System.out.println("The order can't be finished");
        return 0;
      }
    }
    System.out.println("The order can't be finished");
    return -1;
  }

 
  public List<Orders> customerCart(String customerId) {
    return orderRepository.findAll().stream()
        .filter(order -> order.getCustomerId().equals(customerId) && order.getStartTime() == null)
        .collect(Collectors.toList());
  }

 
  public List<Orders> customerGetActiveOrders(String customerId) {
    return orderRepository.findAll().stream().filter(
        order -> order.getCustomerId().equals(customerId) && order.getStartTime() != null
            && order.getEndTime() == null).collect(
        Collectors.toList());
  }

 
  public List<Orders> customerFindPastOrders(String customerId) {
    return orderRepository.findAll().stream()
        .filter(order -> order.getCustomerId().equals(customerId) && order.getEndTime() != null)
        .collect(Collectors.toList());
  }

  
  public List<Orders> getAllPendingOrders() {
    return orderRepository.findAll().stream()
        .filter(order -> order.getStartTime() != null && !order.isDelivery())
        .collect(Collectors.toList());
  }


  public Orders driverGetActiveOrder(String driverId) {
    for (Orders order : orderRepository.findAll()) {
      if (order.getDriverId() != null && order.getDriverId().equals(driverId)
          && order.getEndTime() == null) {
        return order;
      }
    }
    return null;
  }


  public List<Orders> driverFindPastOrders(String driverId) {
    return orderRepository.findAll().stream()
        .filter(order -> order.getDriverId() != null && order.getDriverId().equals(driverId)
            && order.getEndTime() != null)
        .collect(Collectors.toList());
  }

  
  public List<Orders> restaurantGetActiveOrders(String restaurantId) {
    return orderRepository.findAll().stream().filter(
        order -> order.getRestaurantId().equals(restaurantId) && order.getStartTime() != null
            && order.getEndTime() == null).collect(Collectors.toList());
  }


  public List<Orders> restaurantFindPastOrders(String restaurantId) {
    return orderRepository.findAll().stream()
        .filter(order -> order.getRestaurantId().equals(restaurantId) && order.getEndTime() != null)
        .collect(Collectors.toList());
  }

  
  public int addComment(String id, int rating, String content) {
    Optional<Orders> orderOrNot = getOrder(id);
    if (orderOrNot.isPresent()) {
      Orders order = orderOrNot.get();
      if (order.getComment() == null) {
        Comment newComment = new Comment(rating, content);
        order.setComment(newComment);
        orderRepository.save(order);
        System.out.println("Add a comment");
        return 1;
      } else {
        System.out.println("The order already has a comment");
        return 0;
      }
    }
    System.out.println("The order doesn't exist");
    return -1;
  }


  public int deleteComment(String id) {
    Optional<Orders> orderOrNot = getOrder(id);
    if (orderOrNot.isPresent()) {
      Orders order = orderOrNot.get();
      order.setComment(null);
      orderRepository.save(order);
      System.out.println("Delete a comment");
      return 1;
    }
    System.out.println("The order doesn't exist");
    return -1;
  }

 
  public List<Comment> restaurantGetComments(String restaurantId) {
    List<Orders> temp = this.restaurantFindPastOrders(restaurantId);
    List<Comment> res = new ArrayList<>();
    for (Orders o : temp) {
      if (o.getComment() != null) {
        res.add(o.getComment());
      }
    }
    return res;
  }
}