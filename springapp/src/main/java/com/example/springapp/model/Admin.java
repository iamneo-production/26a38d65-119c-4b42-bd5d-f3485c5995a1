package com.example.springapp.model;

import javax.persistence.*;

@Entity
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String userName;
    private String password;
    private String type;
   
    public Admin() {
    }

    // Parameterized constructor
    public Admin(String userName, String password,String type) {
        this.userName = userName;
        this.password = password;
        this.type=type;
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
     public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    // Override toString() (optional, for better logging or debugging)
    @Override
    public String toString() {
        return "Admin{" +
                "id=" + id +
                ", userName='" + userName + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
