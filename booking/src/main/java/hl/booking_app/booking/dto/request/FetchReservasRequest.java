package hl.booking_app.booking.dto.request;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
@Data
public class FetchReservasRequest {

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    Date fecha;
}
