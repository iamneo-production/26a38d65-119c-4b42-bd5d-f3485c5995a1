package com.example.backend.exception;

public class OrderNotFinishedException extends Exception {

  public OrderNotFinishedException(String message) {
    super(message);
  }
}