package com.example.springapp.exception;

public class DishNotExistException extends Exception {

  public DishNotExistException(String message) {
    super(message);
  }
}
