package hl.booking_app.booking.dto.request;

import lombok.Data;

import java.util.Date;

import hl.booking_app.booking.utils.DateDeserealizer;

@Data
public class PersonaRequest {

    private String perNombres;

    private String perApellidos;

    @JsonDeserialize(using = DateDeserealizer.class)
    private Date perFechaNac;

    private String perEstado = "ACT";

    private String perEmail;

    private String perTelefono;

    private String perClave;

    private String perAdmin = "N";
}
