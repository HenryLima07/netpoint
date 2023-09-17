package hl.booking_app.booking.repository;

import hl.booking_app.booking.entities.NpoCancha;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CanchaRepository extends JpaRepository<NpoCancha, Integer> {
}
