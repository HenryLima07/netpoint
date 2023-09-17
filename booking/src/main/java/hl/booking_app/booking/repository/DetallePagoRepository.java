package hl.booking_app.booking.repository;

import hl.booking_app.booking.entities.NpoDetallePago;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetallePagoRepository extends JpaRepository<NpoDetallePago, Integer> {
}
