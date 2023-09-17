package hl.booking_app.booking.helpers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseHelpers<T> {

    public ResponseHelpers(){

    }
    public ResponseEntity<T> Response(Object body, HttpStatus status){
        return new ResponseEntity(body, status);
    }
}
