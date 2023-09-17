package hl.booking_app.booking;

import java.io.IOException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import hl.booking_app.booking.utils.DozerMapper;

@SpringBootApplication
public class BookingApplication {

	@Bean
	public DozerMapper mapper(@Value(value = "classpath*:mappings/*mapping.xml") Resource[] resourcesArray)
			throws IOException {
		DozerMapper mapper = new DozerMapper();
		List<String> mappingFiles = new ArrayList<>();

		for (Resource resource : resourcesArray) {
			mappingFiles.add(String.valueOf(resource.getURL()));

		}
		mapper.init(mappingFiles);
		return mapper;
	}

	public static void main(String[] args) {
		SpringApplication.run(BookingApplication.class, args);
	}
}
