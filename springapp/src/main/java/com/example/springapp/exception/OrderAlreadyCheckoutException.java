package com.example.springapp.exception;

public class OrderAlreadyCheckoutException extends Exception {

  public OrderAlreadyCheckoutException(String message) {
    super(message);
  }
}
