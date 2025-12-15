 const APP_MESSAGES = {
  INTERNAL_SERVER_ERROR: "An internal server error occurred. Please try again later.",
  LOGIN_SUCCESS: "Login successful.",
  EMAIL_EXISTS: "This email is already registered.",
  EMAIL_REQUIRED: "Email is required.",
  EMAIL_PASSWORD_REQUIRED: "Both email and password are required.",
  EMAIL_DOES_NOT_EXIST: "This email does not exist.",
  USER_ALREADY_EXISTS: "A user with this email already exists.",
  REGISTRATION_SUCCESS: "Registration completed successfully.",
  INVALID_CREDENTIALS: "Invalid email or password.",
  ACCESS_DENIED: "Access denied. You are not authorized to perform this action.",
  RECORD_NOT_FOUND: "No record found.",
  DATA_SAVED_SUCCESSFULLY: "Data saved successfully.",
  DATA_UPDATED_SUCCESSFULLY: "Data updated successfully.",
  DATA_DELETED_SUCCESSFULLY: "Data deleted successfully.",
  FILE_UPLOAD_SUCCESS: "File uploaded successfully.",
  FILE_FORMAT_NOT_SUPPORTED: "File format not supported. Please upload a valid file.",


  //Script Error and succcess messages
    SCRIPT_NOT_FOUND: "Script not found.",
    SCRIPT_TEXT_REQUIRED: "Script text is required.",
    SCRIPT_CREATED_SUCCESSFULLY: "Script created successfully.",    
    SCRIPT_CREATED_FROM_TEXT_SUCCESSFULLY: "Script created from text successfully.",
    SCRIPT_UPDATED_SUCCESSFULLY: "Script updated successfully.",
    SCRIPT_DELETED_SUCCESSFULLY: "Script deleted successfully.",


  //AI MESSAGES
    RESPONSE_GENERATED: "Your AI response has been generated successfully.",
    PROCESSING_REQUEST: "AI is processing your request, please wait…",
    FAILED_TO_GENERATE: "AI was unable to generate a response. Please try again.",
    INVALID_PROMPT: "The prompt provided is not valid. Please enter a meaningful message.",
    EMPTY_RESPONSE: "AI did not return any content. Please try again with a different prompt.",
    TOO_MANY_REQUESTS: "You are sending requests too quickly. Please slow down and try again.",
    
};
export default APP_MESSAGES;