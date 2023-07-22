<<<<<<< HEAD

package com.example.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.model.Order;
import com.example.springapp.repository.OrderRepository;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    private OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public void deleteOrderById(Long id){
        orderRepository.deleteById(id);
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    public Order updateOrderById(Long id,Order updatedOrder){
        return orderRepository.findById(id)
                .map(order -> {
                    order.setCustomerId(updatedOrder.getCustomerId());
                    order.setRestaurantId(updatedOrder.getRestaurantId());
                    order.setQuantity(updatedOrder.getQuantity());
                    order.setAmount(updatedOrder.getAmount());
                    order.setShippingAddress(updatedOrder.getShippingAddress());
                    order.setDateTime(updatedOrder.getDateTime());
                    order.setStatus(updatedOrder.getStatus());
                    return orderRepository.save(order);
                })
                .orElse(null);
    }

    public List<Order> getOrdersByCustomerId(Long customerId) {
        return orderRepository.findByCustomerId(customerId);
    }

    public List<Order> getOrdersByRestaurantId(Long restaurantId) {
        return orderRepository.findByRestaurantId(restaurantId);
    }

    public boolean updateOrderStatus(Long orderId, String status) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);

        if (optionalOrder.isPresent()) {
            Order existingOrder = optionalOrder.get();
            existingOrder.setStatus(status);

            orderRepository.save(existingOrder);
            return true; 
        }

        return false; 
    }
 
}

=======
package com.example.springapp.service;

import com.example.springapp.model.Comment;
import com.example.springapp.model.Dish;
import com.example.springapp.model.Order;

import java.util.List;
import java.util.Optional;

public interface OrderService {

  // int addOrderToCart(String customerId, String restaurantId, List<Dish> content);

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
>>>>>>> 7af54b8d64aa4f001f5a2c79ea927fc2fba69d2c
