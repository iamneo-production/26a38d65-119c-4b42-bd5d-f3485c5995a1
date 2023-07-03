package com.example.backend.exception;

public class DishNotExistException extends Exception {

  public DishNotExistException(String message) {
    super(message);
  }
}
