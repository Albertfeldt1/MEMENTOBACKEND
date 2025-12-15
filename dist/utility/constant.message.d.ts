declare const MESSAGES: {
    AUTH: {
        LOGIN_SUCCESS: string;
        LOGOUT_SUCCESS: string;
        INVALID_TOKEN: string;
    };
    USER: {
        NOT_FOUND: string;
        CREATED: string;
    };
    ERROR: {
        GENERIC: string;
        VALIDATION: string;
    };
    MEMBER: {
        MEMBER_CREATED_SUCCESSFULLY: string;
        FAILED_TO_CREATE_MEMBER: string;
        MEMBER_ALREADY_EXISTS: string;
        MEMBER_FETCH_SUCCESS: string;
        FAILED_TO_FETCH_MEMBERS: string;
        MEMBER_NOT_FOUND: string;
        MEMBER_UPDATED_SUCCESSFULLY: string;
        FAILED_TO_UPDATE_MEMBER: string;
        MEMBER_DELETED_SUCCESSFULLY: string;
        FAILED_TO_DELETE_MEMBER: string;
    };
};
export default MESSAGES;
