package com.example.springapp.exception;

public class UserNotExistException extends Exception {

  public UserNotExistException(String message) {
    super(message);
  }
}
