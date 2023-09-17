package hl.booking_app.booking.utils;

import lombok.Getter;
import org.springframework.stereotype.Component;

@Getter
@Component
public class Responses {
    private final String successfulMessage = "Successfully retrieved";
    private final String deleteSuccessful = "Deleted successfully";
    private final String updateSuccessful = "Updated successfully";
    private final String addedSuccessfully = "Added successfully";
    private final String notFoundError = "Element not found";
    private final String errorMessage = "An error occurred";
    private final String loginSuccessful = "Login successfully";
}
