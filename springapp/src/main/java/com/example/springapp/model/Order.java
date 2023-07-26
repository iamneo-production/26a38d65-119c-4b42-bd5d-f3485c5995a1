
package com.example.springapp.model;


import java.util.Date;
import javax.persistence.*;

@Entity
@Table(name="res_order")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    public Order(Long id, Long customerId,Long restaurantId,  Long quantity, Double amount,
                 String shippingAddress, Date dateTime, String status) {
        this.id = id;
        this.customerId = customerId;
        this.restaurantId=restaurantId;
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


