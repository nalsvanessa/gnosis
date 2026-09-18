package com.example.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
public class ExeceptionHandler {

        @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException ex) {
        // Return a custom error message with HTTP 400 status
        return new ResponseEntity<>("Error: " + ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

        @ExceptionHandler(ChallengeNotFoundException.class)
    public ResponseEntity<String> handleChallengeNotFoundException(ChallengeNotFoundException ex) {
        // Return a custom error message with HTTP 404 status
        return new ResponseEntity<>("Error: " + ex.getMessage(), HttpStatus.NOT_FOUND);
    }
    

}
