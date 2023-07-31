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