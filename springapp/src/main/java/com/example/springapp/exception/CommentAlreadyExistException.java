package com.example.springapp.exception;

public class CommentAlreadyExistException extends Exception {

  public CommentAlreadyExistException(String message) {
    super(message);
  }
}