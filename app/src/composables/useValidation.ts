export default function useValidation() {
  function isPhoneValid(input: string): boolean {
    if (typeof input !== 'string') return false;

    const s = input.trim();
    if (!s) return false;

    // Only allow digits, spaces, (), dashes, dots and a single leading +
    if (/[^0-9+().\-\s]/.test(s)) return false;
    if ((s.match(/\+/g) || []).length > 1) return false;
    if (s.includes('+') && !s.startsWith('+')) return false;

    // Strip to digits
    const digits = s.replace(/\D/g, '');
    const len = digits.length;

    // Special-case: RU trunk format like 8XXXXXXXXXX (11 digits)
    if (/^8\d{10}$/.test(digits)) return true;

    // Also allow 11 digits starting with '7' (national without '+')
    if (/^7\d{10}$/.test(digits)) return true;

    // Generic rule: 10–15 digits (E.164 max is 15).
    // If the user typed a plus, the country code can't start with 0.
    if (len >= 10 && len <= 15) {
      if (s.startsWith('+') && digits[0] === '0') return false;
      return true;
    }

    return false;
  }

  const isPasswordValid = (password: string): boolean => {
    const passwordRegex = /^[A-Za-z0-9.,\-/_\\|()~!?&%$#@*]{8,}$/;
    return passwordRegex.test(password);
  };

  return { isPasswordValid, isPhoneValid };
}
