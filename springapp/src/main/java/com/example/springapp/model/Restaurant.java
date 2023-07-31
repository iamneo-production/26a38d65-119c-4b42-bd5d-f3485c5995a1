package com.example.springapp.model;

import javax.persistence.*;

@Entity
public class Restaurant {
    @Id
    private Long id;
    private String restaurantName;
    private String location;
    private Long ownerId;

    public Restaurant() {
    }

    public Restaurant(Long id, String restaurantName, String location, Long ownerId) {
        this.id = id;
        this.restaurantName = restaurantName;
        this.location = location;
        this.ownerId = ownerId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }
}