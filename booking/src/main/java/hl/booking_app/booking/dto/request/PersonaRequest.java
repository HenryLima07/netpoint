package hl.booking_app.booking.dto.request;

import lombok.Data;

import java.util.Date;

@Data
public class PersonaRequest {

    private String perNombres;

    private String perApellidos;

    private Date perFechaNac;

    private String perEstado = "ACT";

    private String perEmail;

    private String perTelefono;

    private String perClave;
}
