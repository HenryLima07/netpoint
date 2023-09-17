package hl.booking_app.booking.repository;

import hl.booking_app.booking.entities.NpoAlumno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlumnoRepository extends JpaRepository<NpoAlumno, Integer> {
    public List<NpoAlumno> findAllByAlmEstado(String estado);
    public List<NpoAlumno> findAllByAlmEstadoPago(String estado);
    public List<NpoAlumno> findAllByAlmEstadoAndAlmEstadoPago(String AlmEstado, String AlmEstadoPago);

}
