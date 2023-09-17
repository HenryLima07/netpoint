package hl.booking_app.booking.dto;

import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Data
@Component
public class GeneralResponseDto {
    String message;

    Object data;

    public GeneralResponseDto(String message, Object data){
        this.message = message;
        this.data = data;
    }
    public GeneralResponseDto(){}

}