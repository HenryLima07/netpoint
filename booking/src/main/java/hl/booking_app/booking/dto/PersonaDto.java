package hl.booking_app.booking.dto;

import lombok.Data;

import java.util.Date;

@Data
public class PersonaDto {

    private String id;

    private String perNombres;

    private String perApellidos;

    private Date perFechaNac;

    private String perEstado;

    private String perEmail;

    private String perTelefono;

//    private String perClave;

}
