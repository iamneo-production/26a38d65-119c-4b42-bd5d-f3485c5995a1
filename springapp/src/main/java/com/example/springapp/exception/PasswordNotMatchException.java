package com.example.springapp.exception;

public class PasswordNotMatchException extends Exception {

  public PasswordNotMatchException(String message) {
    super(message);
  }
}