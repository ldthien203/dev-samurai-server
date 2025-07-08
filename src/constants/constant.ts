export const StatusCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
}

export const ErrorMessage = {
  SOMETHING_IS_WRONG: 'Something is wrong',
  USER_NOT_FOUND: 'User not found',
  USER_ALREADY_EXIST: 'User already exists',
  PASSWORD_INCORRECT: 'Password incorrect',
  NOT_ALLOWED_BY_CORS: 'Not allowed by CORS',
  NO_TOKEN_PROVIDED: 'No token provided',
  INVALID_TOKEN: 'Invalid token',
  VALIDATION_FAILED: 'Validation failed',
  ERROR_HASHING_MESSAGE: 'Error hashing password',
  ERROR_VERIFICATION_MESSAGE: 'Error verification password',
  INVALID_TOKEN_PAYLOAD: 'Invalid token payload',
  TOKEN_VERIFICATION_FAILED: 'Token verification failed',
}

export const MessageResponse = {
  REQUEST_SUCCESS: 'Request successful',
  REGISTER_SUCCESS: 'User registered successfully',
  REGISTER_FAILED: 'Registration failed',
  LOGIN_SUCCESS: 'Login successful',
  LOGIN_FAILED: 'Invalid credentials. Please check your email and password.',
  LOGOUT_SUCCESS: 'Successfully logged out',
  REFRESH_SUCCESS: 'Access token refreshed',
  REFRESH_FAILED: 'Failed to refresh access token',
  REFRESH_TOKEN_NOT_FOUND: 'Refresh token not found',
  UNAUTHORIZED: 'Unauthorized',
  API_SUCCESS: 'API response successful',
}

export const NODE_ENV = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
}
