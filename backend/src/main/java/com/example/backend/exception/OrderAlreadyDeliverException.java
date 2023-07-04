package com.example.backend.exception;

public class OrderAlreadyDeliverException extends Exception {

  public OrderAlreadyDeliverException(String message) {
    super(message);
  }
}
