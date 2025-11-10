// This is just an example,
// so you can safely delete all default props below

export default {
  failed: 'Action failed',
  success: 'Action was successful',

  errors: {
    required: 'Required field',
    passwordsNotSame: 'Passwords do not match',
    passwordNotValid: 'Password does not meet requirements',
    phoneNotValid: 'Invalid phone format',
    unknown: 'Unexpected error. Please try again',
    api: {
      // --- Generic / HTTP-ish ---
      internal_error: 'Something went wrong. Please try again.',
      bad_request: 'Invalid request.',
      validation_error: 'Some fields are invalid.',
      unauthorized: 'You need to sign in.',
      forbidden: "You don't have permission to do this.",
      not_found: 'Requested resource was not found.',
      conflict: 'Conflict detected. Please refresh and try again.',
      rate_limited: 'Too many requests. Please wait and try again.',
      service_unavailable: 'Service is temporarily unavailable.',
      timeout: 'Request timed out. Please try again.',

      // --- Auth / Sessions ---
      email_already_registered: 'This email is already registered.',
      phone_already_registered: 'This phone number is already registered.',
      invalid_credentials: 'Incorrect email or password.',
      login_blocked: 'Too many attempts. Please wait and try again.',
      email_not_verified: 'Please verify your email to continue.',
      verification_code_invalid: 'Invalid verification code.',
      verification_code_expired: 'Verification code has expired.',
      verification_resend_too_soon: 'You can request a new code a bit later.',
      token_missing: 'Missing authentication token.',
      token_invalid: 'Invalid authentication token.',
      token_expired: 'Your session has expired.',
      session_invalid: 'Session is invalid. Please sign in again.',
      session_expired: 'Session has expired. Please sign in again.',
      admin_token_invalid: 'Admin token is invalid.',
      password_too_weak: 'Password is too weak.',
      password_same_as_old: 'New password must differ from the old one.',
      password_reset_invalid: 'Password reset link is invalid.',
      password_reset_expired: 'Password reset link has expired.',
      password_reset_used: 'Password reset link was already used.',

      // --- Users / Admin ---
      user_not_found: 'User not found.',
      user_update_failed: 'Could not update user.',
      user_balance_too_low: 'Insufficient balance.',

      // --- Bots shop ---
      bot_not_found: 'Bot not found.',
      bot_already_exists: 'Bot already exists.',
      bot_activation_code_invalid: 'Invalid activation code.',
      bot_rate_invalid: 'Invalid bot rate.',
      bot_delete_forbidden: 'Cannot delete this bot because it has instances.',

      // --- Instances ---
      instance_not_found: 'Agent instance not found.',
      instance_creation_failed: 'Could not create agent instance.',
      instance_id_already_exists: 'Instance ID already exists.',
      instance_config_invalid: 'Instance configuration is invalid.',
      instance_already_active: 'Instance is already active.',
      instance_already_paused: 'Instance is already paused.',
      instance_not_enough_balance: 'Not enough balance to run the instance.',

      // --- Email / Messaging ---
      email_send_failed: 'Failed to send email.',
      mail_transport_unavailable: 'Mail transport is unavailable.',

      // --- Infra / Storage / External ---
      database_error: 'Database error.',
      unique_constraint_violation: 'Record already exists.',
      redis_error: 'Temporary storage error.',
      external_api_error: 'External service error.',
      external_api_timeout: 'External service timeout.',
      external_api_unauthorized: 'External service rejected authorization.',

      // --- Config / Env ---
      config_error: 'Server configuration error.',
    },
  },

  create_agent: {
    name: 'Agent name',
    description: 'Description',
    telegram_api_key: 'Telegram bot API key',
  },

  profile: {
    balance: 'Balance',
  },

  notification: {
    linkSent: 'Link has been sent to your email',
  },
};
