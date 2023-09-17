package hl.booking_app.booking.service;

import hl.booking_app.booking.dto.ClaseGrupalDto;
import hl.booking_app.booking.entities.NpoClasesGrupal;

import java.util.List;

public interface ClasesGrupalService {
    //Adm services
    public ClaseGrupalDto addClaseGrupal(NpoClasesGrupal req);
    public ClaseGrupalDto updateClaseGrupalById(NpoClasesGrupal req);
    public ClaseGrupalDto deleteClaseGrupalById(Integer id);

    //General services
    public List<ClaseGrupalDto> getAllClaseGrupal();
    public ClaseGrupalDto getClaseGrupalById(Integer id);
    public NpoClasesGrupal getById(Integer id);
}
