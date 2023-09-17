package hl.booking_app.booking.repository;

import hl.booking_app.booking.entities.NpoClasesAlumno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ClasesAlumnoRepository extends JpaRepository<NpoClasesAlumno, Integer> {
    @Query("select cla from NpoClasesAlumno cla join fetch cla.alumno al join fetch al.persona p where p.perEmail =:email")
    public NpoClasesAlumno findByAlumnoPersonaPerEmail(String email);
}
