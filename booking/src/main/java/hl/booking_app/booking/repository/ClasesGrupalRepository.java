package hl.booking_app.booking.repository;

import hl.booking_app.booking.entities.NpoClasesGrupal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClasesGrupalRepository extends JpaRepository<NpoClasesGrupal, Integer> {
}
