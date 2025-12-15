const MESSAGES = {
  AUTH: {
    LOGIN_SUCCESS: 'Login successful.',
    LOGOUT_SUCCESS: 'Logout successful.',
    INVALID_TOKEN: 'Invalid token.',
  },
  USER: {
    NOT_FOUND: 'User not found.',
    CREATED: 'User created successfully.',
  },
  ERROR: {
    GENERIC: 'Something went wrong.',
    VALIDATION: 'Validation failed.',
  },
  MEMBER: {
    MEMBER_CREATED_SUCCESSFULLY: 'Member added successfully!',
    FAILED_TO_CREATE_MEMBER: 'Unable to add member. Please try again.',
    MEMBER_ALREADY_EXISTS: 'A member with this phone number already exists.',
    MEMBER_FETCH_SUCCESS: 'Members fetched successfully!',
    FAILED_TO_FETCH_MEMBERS: 'Unable to fetch members. Please try again.',
    MEMBER_NOT_FOUND: 'Member not found.',
    MEMBER_UPDATED_SUCCESSFULLY: 'Member details updated successfully!',
    FAILED_TO_UPDATE_MEMBER: 'Failed to update member. Please try again.',
    MEMBER_DELETED_SUCCESSFULLY: 'Member removed successfully!',
    FAILED_TO_DELETE_MEMBER: 'Failed to remove member. Please try again.',
  },
};
export default MESSAGES;
