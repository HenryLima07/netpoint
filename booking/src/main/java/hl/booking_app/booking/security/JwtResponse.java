package hl.booking_app.booking.security;

import java.io.Serializable;

public class JwtResponse implements Serializable {

    private static final long serialVersionUID = -8091879091924046844L;

    private final String jwtToken;

    public JwtResponse(String token){
        this.jwtToken = token;
    }

    public String getJwtToken() {
        return this.jwtToken;
    }
}
