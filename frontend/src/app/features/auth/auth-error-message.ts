const fieldLabels: Record<string, string> = {
  email: 'Email',
  password: 'Password',
  fullName: 'Full name',
  phone: 'Phone number',
  age: 'Age',
  gender: 'Gender',
  confirmPassword: 'Confirm password'
};

export function getAuthErrorMessage(err: any, fallback: string, context: 'login' | 'signup'): string {
  const validationMessages = err.error?.extra
    ?.flatMap((item: any) => item.details?.map((detail: any) => formatValidationMessage(item.key, detail, context)) || [])
    .filter(Boolean)
    .join(', ');

  return validationMessages
    || (err.error?.errorMessage !== 'validation error' ? err.error?.errorMessage : '')
    || err.error?.message
    || err.message
    || fallback;
}

function formatValidationMessage(itemKey: string, detail: any, context: 'login' | 'signup'): string {
  const field = detail.path?.[0] || itemKey;
  const label = fieldLabels[field] || field;

  if (detail.type === 'any.required') {
    return `${label} is required.`;
  }

  if (detail.type === 'string.email') {
    return 'Enter a valid email address.';
  }

  if (detail.type === 'string.pattern.base' && field === 'password') {
    return context === 'signup'
      ? 'Password must be 8-16 characters and include uppercase, lowercase, number, and special character.'
      : 'Enter a valid password.';
  }

  if (detail.type === 'string.pattern.base' && field === 'fullName') {
    return 'Enter first and last name using English letters.';
  }

  if (detail.type === 'string.pattern.base' && field === 'phone') {
    return 'Enter a valid Egyptian phone number.';
  }

  if (detail.type === 'number.min' && field === 'age') {
    return 'Age must be at least 18.';
  }

  if (detail.type === 'number.max' && field === 'age') {
    return 'Age must be 60 or less.';
  }

  if (detail.type === 'any.only' && field === 'confirmPassword') {
    return 'Passwords do not match.';
  }

  if (detail.type === 'any.only' && field === 'gender') {
    return 'Choose male or female.';
  }

  return `${label} is invalid.`;
}