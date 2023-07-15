<<<<<<< HEAD
<<<<<<< HEAD
package com.example.springapp.model;


import javax.persistence.*;

@Entity
@Table(name = "drivers")
public class Driver extends User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;



  public Driver() {
    this.setType("driver");
  }

  public Driver(String userName, String password, String phoneNumber, String address,
      String city, String state, String zip) {
    super(userName, password, phoneNumber, address, city, state, zip);
    this.setType("driver");
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }
}

=======
=======
>>>>>>> Food-Ordering-and-Delivery-Application-anjalisingh11062002
package com.example.springapp.model;


import javax.persistence.*;

@Entity
@Table(name = "drivers")
public class Driver extends User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;



  public Driver() {
    this.setType("driver");
  }

  public Driver(String userName, String password, String phoneNumber, String address,
      String city, String state, String zip) {
    super(userName, password, phoneNumber, address, city, state, zip);
    this.setType("driver");
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }
}
<<<<<<< HEAD
>>>>>>> Food-Ordering-and-Delivery-Application-malli172
=======

>>>>>>> Food-Ordering-and-Delivery-Application-anjalisingh11062002
