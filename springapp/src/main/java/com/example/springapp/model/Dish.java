<<<<<<< HEAD
<<<<<<< HEAD
package com.example.springapp.model;


import javax.persistence.*;



@Entity
@Table(name = "customer")
public class Customer extends User {

  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;


 public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }




  public Customer() {
    this.setType("customer");
  }

  public Customer(String userName, String password, String phoneNumber, String address,
      String city, String state, String zip) {
    super(userName, password, phoneNumber, address, city, state, zip);
    this.setType("customer");
  }
}
=======
=======
>>>>>>> Food-Ordering-and-Delivery-Application-anjalisingh11062002
package com.example.springapp.model;


import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "dishes")
public class Dish {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "restaurant_id")
  private Restaurants restaurant;

  private String dishName;
  private double price;
  @Column(name = "image_url", length = 10000)
  private String imageUrl;

  public Dish() {
  } 
  
  public Dish(String dishName, double price, String imageUrl) {
    this.dishName = dishName;
    this.price = price;
    this.imageUrl = imageUrl;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }


  public String getDishName() {
    return dishName;
  }

  public void setDishName(String dishName) {
    this.dishName = dishName;
  }

  public double getPrice() {
    return price;
  }

  public void setPrice(double price) {
    this.price = price;
  }

  public String getImageUrl() {
    return imageUrl;
  }

  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof Dish)) {
      return false;
    }
    Dish dish = (Dish) o;
    return Double.compare(dish.getPrice(), getPrice()) == 0 &&
        getDishName().equals(dish.getDishName()) &&
        getImageUrl().equals(dish.getImageUrl());
  }

  @Override
  public int hashCode() {
    return Objects.hash(getDishName(), getPrice(), getImageUrl());
  }

  public void setRestaurant(Restaurants restaurant) {
    this.restaurant = restaurant;
  }

  @Override
  public String toString() {
    return "Dish{" +
        "id=" + id +
        ", dishName='" + dishName + '\'' +
        ", price=" + price +
        ", imageUrl='" + imageUrl + '\'' +
        '}';
  }
}
<<<<<<< HEAD
>>>>>>> Food-Ordering-and-Delivery-Application-malli172
=======
>>>>>>> Food-Ordering-and-Delivery-Application-anjalisingh11062002
