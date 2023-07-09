package com.example.springapp.exception;

public class OrderAlreadyFinishException extends Exception {

  public OrderAlreadyFinishException(String message) {
    super(message);
  }
}
