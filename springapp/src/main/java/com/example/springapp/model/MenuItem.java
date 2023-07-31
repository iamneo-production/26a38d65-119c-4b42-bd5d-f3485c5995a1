package com.example.springapp.model;

import javax.persistence.*;

@Entity
public class MenuItem {
    @Id
    private Long id;
    private String name;
    private String description;
    private Double price;
    private String tags;

    public MenuItem() {
    }

    public MenuItem(Long id, String name, String description, Double price, String tags) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.tags = tags;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }
}