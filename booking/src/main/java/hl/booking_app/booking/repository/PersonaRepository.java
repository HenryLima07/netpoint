package hl.booking_app.booking.repository;

import hl.booking_app.booking.entities.NpoPersona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonaRepository extends JpaRepository<NpoPersona, Integer> {
    NpoPersona findByPerEmail(String perEmail);
}
