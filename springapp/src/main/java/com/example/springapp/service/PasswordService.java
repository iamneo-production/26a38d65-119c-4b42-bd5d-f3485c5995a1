<<<<<<< HEAD
package com.example.springapp.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PasswordService {
  private final BCryptPasswordEncoder bCryptPasswordEncoder;

  public PasswordService() {
    bCryptPasswordEncoder = new BCryptPasswordEncoder();
  }

  public String generatePassword(String password) {
    return bCryptPasswordEncoder.encode(password);
  }

  public boolean passwordMatch(String password, String encodedPassword) {
    return bCryptPasswordEncoder.matches(password, encodedPassword);
  }
}
=======
package com.example.springapp.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PasswordService {
  private final BCryptPasswordEncoder bCryptPasswordEncoder;

  public PasswordService() {
    bCryptPasswordEncoder = new BCryptPasswordEncoder();
  }

  public String generatePassword(String password) {
    return bCryptPasswordEncoder.encode(password);
  }

  public boolean passwordMatch(String password, String encodedPassword) {
    return bCryptPasswordEncoder.matches(password, encodedPassword);
  }
}
>>>>>>> Food-Ordering-and-Delivery-Application-malli172
