export default {
  // keep parity with en-US top-level keys
  failed: 'Действие не удалось',
  success: 'Действие выполнено успешно',

  errors: {
    required: 'Обязательное поле',
    passwordsNotSame: 'Пароли не совпадают',
    passwordNotValid: 'Пароль не соответствует требованиям',
    phoneNotValid: 'Неверный формат телефона',
    unknown: 'Непредвиденная ошибка. Попробуйте снова',
    api: {
      // --- Generic / HTTP-ish ---
      internal_error: 'Что-то пошло не так. Попробуйте снова.',
      bad_request: 'Некорректный запрос.',
      validation_error: 'Некоторые поля заполнены неверно.',
      unauthorized: 'Войдите в систему.',
      forbidden: 'Недостаточно прав для выполнения действия.',
      not_found: 'Ресурс не найден.',
      conflict: 'Конфликт данных. Обновите страницу и попробуйте снова.',
      rate_limited: 'Слишком много запросов. Подождите и попробуйте снова.',
      service_unavailable: 'Сервис временно недоступен.',
      timeout: 'Время ожидания запроса истекло.',

      // --- Auth / Sessions ---
      email_already_registered: 'Эта почта уже зарегистрирована.',
      phone_already_registered: 'Этот номер уже зарегистрирован.',
      invalid_credentials: 'Неверная почта или пароль.',
      login_blocked: 'Слишком много попыток. Подождите и попробуйте снова.',
      email_not_verified: 'Подтвердите адрес эл. почты для продолжения.',
      verification_code_invalid: 'Неверный код подтверждения.',
      verification_code_expired: 'Срок действия кода подтверждения истёк.',
      verification_resend_too_soon: 'Запросить новый код можно чуть позже.',
      token_missing: 'Отсутствует токен авторизации.',
      token_invalid: 'Неверный токен авторизации.',
      token_expired: 'Срок действия сессии истёк.',
      session_invalid: 'Сессия недействительна. Войдите снова.',
      session_expired: 'Сессия истекла. Войдите снова.',
      admin_token_invalid: 'Неверный админ-токен.',
      password_too_weak: 'Пароль слишком простой.',
      password_same_as_old: 'Новый пароль совпадает со старым.',
      password_reset_invalid: 'Ссылка на смену пароля недействительна.',
      password_reset_expired: 'Ссылка на смену пароля истекла.',
      password_reset_used: 'Ссылка на смену пароля уже использована.',

      // --- Users / Admin ---
      user_not_found: 'Пользователь не найден.',
      user_update_failed: 'Не удалось обновить данные пользователя.',
      user_balance_too_low: 'Недостаточно средств на балансе.',

      // --- Bots shop ---
      bot_not_found: 'Бот не найден.',
      bot_already_exists: 'Бот уже существует.',
      bot_activation_code_invalid: 'Неверный код активации.',
      bot_rate_invalid: 'Некорректная стоимость бота.',
      bot_delete_forbidden: 'Нельзя удалить бота — есть активные инстансы.',

      // --- Instances ---
      instance_not_found: 'Экземпляр агента не найден.',
      instance_creation_failed: 'Не удалось создать экземпляр агента.',
      instance_id_already_exists: 'Идентификатор экземпляра уже существует.',
      instance_config_invalid: 'Некорректная конфигурация экземпляра.',
      instance_already_active: 'Экземпляр уже активен.',
      instance_already_paused: 'Экземпляр уже приостановлен.',
      instance_not_enough_balance: 'Недостаточно средств для работы экземпляра.',

      // --- Email / Messaging ---
      email_send_failed: 'Не удалось отправить письмо.',
      mail_transport_unavailable: 'Почтовый сервис недоступен.',

      // --- Infra / Storage / External ---
      database_error: 'Ошибка базы данных.',
      unique_constraint_violation: 'Запись уже существует.',
      redis_error: 'Ошибка временного хранилища.',
      external_api_error: 'Ошибка внешнего сервиса.',
      external_api_timeout: 'Таймаут внешнего сервиса.',
      external_api_unauthorized: 'Внешний сервис отклонил авторизацию.',

      // --- Config / Env ---
      config_error: 'Ошибка конфигурации сервера.',
    },
  },

  create_agent: {
    name: 'Название агента',
    description: 'Описание',
    telegram_api_key: 'API ключ Telegram бота',
  },

  profile: {
    balance: 'Баланс',
  },

  notification: {
    linkSent: 'Ссылка отправлена на вашу почту',
  },
};


