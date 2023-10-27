package hl.booking_app.booking.repository;

import hl.booking_app.booking.entities.NpoReservasCancha;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ReservasCanchaRepository extends JpaRepository<NpoReservasCancha, Integer> {
     public List<NpoReservasCancha> findAllByPersonaId(Integer id);

     @Query(value = "select reserva from NpoReservasCancha reserva where reserva.persona.id =:id and reserva.rscEstado =:rscEstado")
     public List<NpoReservasCancha> findAllByRscEstadoAndPersonaId(String rscEstado, Integer id);

     public List<NpoReservasCancha> findAllByRscFechaReservaAndCanchaId(Date rscFechaReserva, Integer cancha_id);
//     public List<NpoReservasCancha> findAllByRscFechaReserva(Date rscFechaReserva);
}
