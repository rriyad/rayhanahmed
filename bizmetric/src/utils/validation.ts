// ============================================================
// VALIDATION UTILITIES
// ============================================================

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export function validateRequired(fields: Record<string, string>): ValidationResult {
  const errors: Record<string, string> = {};

  for (const [key, value] of Object.entries(fields)) {
    if (value === '' || value === null || value === undefined) {
      errors[key] = 'This field is required.';
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validatePositive(
  fields: Record<string, string>,
  fieldNames: string[]
): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const key of fieldNames) {
    const val = parseFloat(fields[key] ?? '');
    if (!isNaN(val) && val <= 0) {
      errors[key] = 'Value must be greater than zero.';
    }
  }

  return errors;
}

export function validateNonNegative(
  fields: Record<string, string>,
  fieldNames: string[]
): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const key of fieldNames) {
    const val = parseFloat(fields[key] ?? '');
    if (!isNaN(val) && val < 0) {
      errors[key] = 'Value must be zero or greater.';
    }
  }

  return errors;
}
