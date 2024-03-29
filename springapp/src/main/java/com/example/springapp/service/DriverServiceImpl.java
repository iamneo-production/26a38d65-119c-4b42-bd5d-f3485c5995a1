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
      return driver;
    }
    return null;
  }

  public int getTotalNumberOfDrivers() {
    return (int) driverRepository.count();
  }

  public List<Driver> getAllUsers() {
        return driverRepository.findAll();
    }

  @Override
  public int deleteUser(String id) {
    Optional<Driver> driver = getUser(id);
    if (driver.isPresent()) {
      long number = Long.parseLong(id);
      driverRepository.deleteById(number);
      return 1;
    }
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
        return 1;
      } else {
        return 0;
      }
    }
    return -1;
  }

  @Override
  public int updatePhoneNumber(String id, String newNumber) {
    Optional<Driver> driver = getUser(id);
    if (driver.isPresent()) {
      driver.get().setPhoneNumber(newNumber);
      driverRepository.save(driver.get());
      return 1;
    }
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
      return 1;
    }
    return -1;
  }
}
