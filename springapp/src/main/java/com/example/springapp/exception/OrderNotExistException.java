package com.example.springapp.exception;

public class OrderNotExistException extends Exception {

  public OrderNotExistException(String message) {
    super(message);
  }
}
