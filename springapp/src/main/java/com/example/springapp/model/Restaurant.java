package com.example.springapp.model;

import javax.persistence.*;


@Entity
public class Restaurant {
    @Id
    private Long id;
    private String name;
    private String location;
    private Long ownerId;


   public Long getId() {
    return id;
  }

    // public Long getId() {
    //     return id;
    // }

  @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private List<Dish> menu;


  public Restaurant() {
    this.setType("restaurant");
  }


  public Restaurant(String userName, String password, String phoneNumber, String address,
      String city, String state, String zip, RestaurantInfo information,
      List<Dish> menu) {
    super(userName, password, phoneNumber, address, city, state, zip);
    this.setType("restaurant");
    this.information = information;
    this.menu = menu;
  }

  public Restaurant(String userName, String password, String phoneNumber, String address,
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


// // Restarurant model

// package com.example.springapp.model;

// import javax.persistence.*;

// @Entity
// public class Restaurant {
//     @Id
//     private Long id;
//     private String name;
//     private String location;
//     private Long ownerId;

//   @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//   private List<Dish> menu;


//   public Restaurant() {
//     this.setType("restaurant");
//   }


//   public Restaurant(String userName, String password, String phoneNumber, String address,
//       String city, String state, String zip, RestaurantInfo information,
//       List<Dish> menu) {
//     super(userName, password, phoneNumber, address, city, state, zip);
//     this.setType("restaurant");
//     this.information = information;
//     this.menu = menu;
//   }

//   public Restaurant(String userName, String password, String phoneNumber, String address,
//       String city, String state, String zip) {
//     super(userName, password, phoneNumber, address, city, state, zip);
//     this.setType("restaurant");
//   }

//   public RestaurantInfo getInformation() {
//     return information;
//   }

//   public void setInformation(RestaurantInfo information) {
//     this.information = information;
//   }

//   public List<Dish> getMenu() {
//     System.out.println(menu);
//     return menu;
//   }

//   public void setMenu(List<Dish> menu) {
//     this.menu = menu;
//     for (Dish dish : menu) {
//       dish.setRestaurant(this);
//     }
//   }

//   @Override
//   public String toString() {
//     return "Restaurant{" +
//         "id"+ id+
//         "information=" + information +
//         ", menu=" + menu +
//         '}';
//   }
// }

// >>>>>>> 11fb0bd13a5108a2e7228cf98f73fc2fa4eead63
