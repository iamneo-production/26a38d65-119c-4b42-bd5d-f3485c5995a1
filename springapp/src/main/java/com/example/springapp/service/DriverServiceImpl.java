package com.example.springapp.service;

import com.example.springapp.model.Driver;
import com.example.springapp.repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DriverServiceImpl implements UserService<Driver> {

  private final DriverRepository driverRepository;
  private final PasswordService passwordService;

  @Autowired
  public DriverServiceImpl(DriverRepository driverRepository, PasswordService passwordService) {
    this.driverRepository = driverRepository;
    this.passwordService = passwordService;
  }

  @Override
  public Driver addUser(String userName, String password, String phoneNumber, String address,
                        String city, String state, String zip) {
    if (getUserIdByName(userName) == null) {
      String newPassword = passwordService.generatePassword(password);
      Driver driver = new Driver(userName, newPassword, phoneNumber, address, city, state, zip);
      driverRepository.save(driver);
      System.out.println("Driver added to the database");
      return driver;
    }
    System.out.println("Driver can't be added to the database");
    return null;
  }

  @Override
  public int deleteUser(String id) {
    Optional<Driver> driver = getUser(id);
    if (driver.isPresent()) {
      long number = Long.parseLong(id);
      driverRepository.deleteById(number);
      System.out.println("Driver deleted from the database");
      return 1;
    }
    System.out.println("Driver can't be deleted from the database");
    return -1;
  }

  @Override
  public Optional<Driver> getUser(String id) {
    if (id != null) {
      long number = Long.parseLong(id);
      return driverRepository.findById(number);
    }
    return Optional.empty();
  }

  @Override
  public String getUserIdByName(String userName) {
    List<Driver> drivers = getUsers();
    for (Driver driver : drivers) {
      if (driver.getUserName().equals(userName)) {
        return String.valueOf(driver.getId());
      }
    }
    System.out.println("Given userName not found in the driver database");
    return null;
  }

  @Override
  public Optional<Driver> getUserByName(String userName) {
    return getUser(getUserIdByName(userName));
  }

  @Override
  public List<Driver> getUsers() {
    return driverRepository.findAll();
  }

  @Override
  public boolean passwordMatch(String id, String password) {
    Optional<Driver> driver = getUser(id);
    return driver.isPresent() && passwordService.passwordMatch(password, driver.get().getPassword());
  }

  @Override
  public int updatePassword(String id, String oldPassword, String newPassword) {
    Optional<Driver> driver = getUser(id);
    if (driver.isPresent()) {
      if (passwordMatch(id, oldPassword)) {
        driver.get().setPassword(passwordService.generatePassword(newPassword));
        driverRepository.save(driver.get());
        System.out.println("Password updated");
        return 1;
      } else {
        System.out.println("Password doesn't match");
        return 0;
      }
    }
    System.out.println("Unable to update the password");
    return -1;
  }

  @Override
  public int updatePhoneNumber(String id, String newNumber) {
    Optional<Driver> driver = getUser(id);
    if (driver.isPresent()) {
      driver.get().setPhoneNumber(newNumber);
      driverRepository.save(driver.get());
      System.out.println("Phone number updated");
      return 1;
    }
    System.out.println("Unable to update the phone number");
    return -1;
  }

  @Override
  public int updateAddress(String id, String address, String city, String state, String zip) {
    Optional<Driver> driver = getUser(id);
    if (driver.isPresent()) {
      driver.get().setAddress(address);
      driver.get().setCity(city);
      driver.get().setState(state);
      driver.get().setZip(zip);
      driverRepository.save(driver.get());
      System.out.println("Address updated");
      return 1;
    }
    System.out.println("Unable to update the address");
    return -1;
  }
}
