package com.example.springapp.service;

import com.example.springapp.model.Customer;
import com.example.springapp.model.Dish;
import com.example.springapp.repository.CustomerRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService implements UserService<Customer> {

  @Autowired
  private CustomerRepository customerRepository;

  @Autowired
  private PasswordService passwordService ;

  @Override
  public Customer addUser(String userName, String password, String phoneNumber, String address,
      String city, String state, String zip) {
    if (this.getUserIdByName(userName) == null) {
      String newPassword = passwordService.generatePassword(password);
      Customer customer = new Customer(userName, newPassword, phoneNumber, address, city, state, zip);
      customerRepository.save(customer);
      return customer;
    }
    return null;
  }

  @Override
  public int deleteUser(String id) {
    long number = Long.parseLong(id);
    if (this.getUser(id).isPresent()) {
      customerRepository.deleteById(number);
      return 1;
    }
    return -1;
  }

  @Override
  public Optional<Customer> getUser(String id) {
    if (id != null) {
      Long number = Long.parseLong(id);
      return customerRepository.findById(number);
    }
    return Optional.empty();
  }

  @Override
  public String getUserIdByName(String userName) {
    List<Customer> customers = this.getUsers();
    for (Customer customer : customers) {
      if (customer.getUserName().equals(userName)) {
        return customer.getId()+"";
      }
    }
    return null;
  }

  public int getTotalNumberOfCustomers() {
    return (int) customerRepository.count();
  }

    public List<Customer> getAllUsers() {
        return customerRepository.findAll();
    }

  @Override
  public Optional<Customer> getUserByName(String userName) {
    return this.getUser(getUserIdByName(userName));
  }

 
  @Override
  public List<Customer> getUsers() {
    return customerRepository.findAll();
  }

  @Override
  public boolean passwordMatch(String id, String password) {
    Optional<Customer> customer = this.getUser(id);
    return customer.isPresent() && passwordService.passwordMatch(password, customer.get().getPassword());
  }

  @Override
  public int updatePassword(String id, String oldPassword, String newPassword) {
    Optional<Customer> customer = this.getUser(id);
    if (customer.isPresent()) {
      if (this.passwordMatch(id, oldPassword)) {
        customer.get().setPassword(passwordService.generatePassword(newPassword));
        customerRepository.save(customer.get());
        return 1;
      } else {
        return 0;
      }
    }
    return -1;
  }

  @Override
  public int updatePhoneNumber(String id, String newNumber) {
    Optional<Customer> customer = this.getUser(id);
    if (customer.isPresent()) {
      customer.get().setPhoneNumber(newNumber);
      customerRepository.save(customer.get());
      return 1;
    }
    return -1;
  }

  @Override
  public int updateAddress(String id, String address, String city, String state,
      String zip) {
    Optional<Customer> customer = this.getUser(id);
    if (customer.isPresent()) {
      customer.get().setAddress(address);
      customer.get().setCity(city);
      customer.get().setState(state);
      customer.get().setZip(zip);
      customerRepository.save(customer.get());
      return 1;
    }
    return -1;
  }

  
}
