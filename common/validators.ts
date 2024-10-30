import { helpers } from '@vuelidate/validators';

/**
 * Валидатор для проверки является ли строка буквенно-цифровой.
 */
export const alphaNum = helpers.withMessage(
    'Поле должно содержать только буквы и цифры',
    helpers.regex('alphaNum', /^[a-zA-Z0-9]*$/)
);

/**
 * Валидатор для проверки сильного пароля.
 * Пароль должен содержать хотя бы одну заглавную букву, одну строчную букву, одну цифру и быть длиной не менее 8 символов.
 */
export const strongPassword = helpers.withMessage(
    'Пароль должен содержать не менее 8 символов, включая заглавные и строчные буквы и цифры',
    (value: string) => {
        if (!value) return false;
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return strongPasswordRegex.test(value);
    }
);

/**
 * Валидатор для проверки совпадения значений двух полей (например, пароль и подтверждение пароля).
 */
export function sameAs(otherFieldName: string, otherFieldValue: () => any) {
    return helpers.withParams(
        { otherFieldName },
        (value, parentVm) => value === otherFieldValue()
    );
}

/**
 * Валидатор для проверки, что значение находится в указанном числовом диапазоне.
 */
export function between(min: number, max: number) {
    return helpers.withMessage(
        `Значение должно быть между ${min} и ${max}`,
        (value: number) => value >= min && value <= max
    );
}

/**
 * Валидатор для проверки, что строка соответствует определенной маске (например, номер телефона).
 */
export function pattern(mask: RegExp, message: string) {
    return helpers.withMessage(
        message,
        (value: string) => mask.test(value)
    );
}