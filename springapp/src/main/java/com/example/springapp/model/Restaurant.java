package main.java.com.example.springapp.model;

import javax.persistence.*;

@Entity
public class Restaurant {
    @Id
    private Long id;
    private String name;
    private String location;
    private Long ownerId;

    public Restaurant() {
    }

    public Restaurant(Long id, String name, String location, Long ownerId) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.ownerId = ownerId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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