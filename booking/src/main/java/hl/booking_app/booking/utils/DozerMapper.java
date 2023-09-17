package hl.booking_app.booking.utils;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.dozer.DozerBeanMapper;

public class DozerMapper {

    DozerBeanMapper mapper;
    String timesStamp;

    public void init(List<String> mappingFiles) {
        mapper = new DozerBeanMapper();
        mapper.setMappingFiles(mappingFiles);

        SimpleDateFormat df = new SimpleDateFormat("HH:mm:ss:ssss");
        timesStamp = df.format(new java.util.Date());
    }

    public <T extends Object> T map(Object source, Class<T> destinationClass) {
        return mapper.map(source, destinationClass);
    }

    public void map(Object source, Object destination) {
        mapper.map(source, destination);
    }

    public <T extends Object> List<T> maplist(Iterable<?> sourceList, Class<T> destinationClass) {

        List<T> result = new ArrayList<>();

        try {
            for (Object sourceObject : sourceList) {
                T destinationObject = mapper.map(sourceObject, destinationClass);
                result.add(destinationObject);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}
