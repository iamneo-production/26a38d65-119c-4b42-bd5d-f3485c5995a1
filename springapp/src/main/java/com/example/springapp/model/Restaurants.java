package com.example.springapp.model;

import javax.persistence.*;



import java.util.List;

@Entity
@Table(name = "restaurants")
public class Restaurants extends User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;


   public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  @OneToOne(cascade = CascadeType.ALL)
  private RestaurantInfo information;

  @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private List<Dish> menu;


  public Restaurants() {
    this.setType("restaurant");
  }


  public Restaurants(String userName, String password, String phoneNumber, String address,
      String city, String state, String zip, RestaurantInfo information,
      List<Dish> menu) {
    super(userName, password, phoneNumber, address, city, state, zip);
    this.setType("restaurant");
    this.information = information;
    this.menu = menu;
  }

  public Restaurants(String userName, String password, String phoneNumber, String address,
      String city, String state, String zip) {
    super(userName, password, phoneNumber, address, city, state, zip);
    this.setType("restaurant");
  }

  public RestaurantInfo getInformation() {
    return information;
  }

  public void setInformation(RestaurantInfo information) {
    this.information = information;
  }

  public List<Dish> getMenu() {
    System.out.println(menu);
    return menu;
  }

  public void setMenu(List<Dish> menu) {
    this.menu = menu;
    for (Dish dish : menu) {
      dish.setRestaurant(this);
    }
  }

  @Override
  public String toString() {
    return "Restaurant{" +
        "id"+ id+
        "information=" + information +
        ", menu=" + menu +
        '}';
  }
}