<<<<<<< HEAD
package com.example.springapp.model;

import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.*;


@Entity
@Table(name = "orders")
public class Order {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String customerId;
  
  private String restaurantId;

  private String driverId;
  private LocalDateTime startTime;
  private boolean delivery;
  private LocalDateTime endTime;

  @OneToMany(cascade = CascadeType.ALL)
  private List<Dish> content;

  private double price;

  @OneToOne(cascade = CascadeType.ALL)
  private Comment comment;

  public Order() {
  }

  public Order(String customerId, String restaurantId, String driverId,
      LocalDateTime startTime, boolean delivery, LocalDateTime endTime,
      List<Dish> content, double price, Comment comment) {
    this.customerId = customerId;
    this.restaurantId = restaurantId;
    this.driverId = driverId;
    this.startTime = startTime;
    this.delivery = delivery;
    this.endTime = endTime;
    this.content = content;
    this.price = price;
    this.comment = comment;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getCustomerId() {
    return customerId;
  }

  public void setCustomerId(String customerId) {
    this.customerId = customerId;
  }

  public String getRestaurantId() {
    return restaurantId;
  }

  public void setRestaurantId(String restaurantId) {
    this.restaurantId = restaurantId;
  }

  public String getDriverId() {
    return driverId;
  }

  public void setDriverId(String driverId) {
    this.driverId = driverId;
  }

  public LocalDateTime getStartTime() {
    return startTime;
  }

  public void setStartTime(LocalDateTime startTime) {
    this.startTime = startTime;
  }

  public boolean isDelivery() {
    return delivery;
  }

  public void setDelivery(boolean delivery) {
    this.delivery = delivery;
  }

  public LocalDateTime getEndTime() {
    return endTime;
  }

  public void setEndTime(LocalDateTime endTime) {
    this.endTime = endTime;
  }

  public List<Dish> getContent() {
    return content;
  }

  public void setContent(List<Dish> content) {
    this.content = content;
  }

  public double getPrice() {
    return price;
  }

  public void setPrice(double price) {
    this.price = price;
  }

  public Comment getComment() {
    return comment;
  }

  public void setComment(Comment comment) {
    this.comment = comment;
  }

  @Override
  public String toString() {
    return "Order{" +
        "id=" + id +
        ", customerId='" + customerId + '\'' +
        ", restaurantId='" + restaurantId + '\'' +
        ", driverId='" + driverId + '\'' +
        ", startTime=" + startTime +
        ", delivery=" + delivery +
        ", endTime=" + endTime +
        ", content=" + content +
        ", price=" + price +
        ", comment=" + comment +
        '}';
  }
}
=======
package com.example.springapp.model;


import java.util.Date;
import javax.persistence.*;

@Entity
@Table(name="res_order")
public class Order {
    @Id
    private Long id;
    private Long customerId;
    private Long restaurantId;
    private Long quantity;
    private Double amount;
    private String shippingAddress;
    private Date dateTime;
    private String status;

    public Order() {
    }

    public Order(Long id, Long customerId, Long restaurantId, Long quantity, Double amount,
                 String shippingAddress, Date dateTime, String status) {
        this.id = id;
        this.customerId = customerId;
        this.restaurantId = restaurantId;
        this.quantity = quantity;
        this.amount = amount;
        this.shippingAddress = shippingAddress;
        this.dateTime = dateTime;
        this.status = status;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Long getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Long restaurantId) {
        this.restaurantId = restaurantId;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public Date getDateTime() {
        return dateTime;
    }

    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
>>>>>>> Food-Ordering-and-Delivery-Application-malli172
