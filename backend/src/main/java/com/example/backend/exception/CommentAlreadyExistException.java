package com.example.backend.exception;

public class CommentAlreadyExistException extends Exception {

  public CommentAlreadyExistException(String message) {
    super(message);
  }
}
