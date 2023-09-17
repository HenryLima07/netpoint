package hl.booking_app.booking.repository;

import hl.booking_app.booking.entities.NpoHorariosCancha;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HorariosCanchaRepository extends JpaRepository<NpoHorariosCancha, Integer> {
}
