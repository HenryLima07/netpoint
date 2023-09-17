package hl.booking_app.booking.repository;

import hl.booking_app.booking.entities.NpoHorariosClase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HorarioClaseRepository extends JpaRepository<NpoHorariosClase, Integer> {
}
