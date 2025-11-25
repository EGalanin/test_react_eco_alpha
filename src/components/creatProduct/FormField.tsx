import { FieldError, UseFormRegister } from 'react-hook-form';

type FormFieldProps = {
    name: string;
    label: string;
    type?: 'text' | 'number' | 'textarea';
    register: UseFormRegister<any>;
    error?: FieldError;
    required?: boolean;
    placeholder?: string;
};

export const FormField = ({
    name,
    label,
    type = 'text',
    register,
    error,
    required = false,
    placeholder,
}: FormFieldProps) => (
    <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-200 mb-1'>{label}</label>
        {type === 'textarea' ? (
            <textarea
                placeholder={placeholder}
                {...register(name, { required: required && 'Обязательное поле' })}
                className='w-full p-2 border rounded bg-white text-gray-900 placeholder-gray-400'
            />
        ) : (
            <input
                type={type}
                placeholder={placeholder}
                {...register(name, {
                    required: required && 'Обязательное поле',
                    valueAsNumber: type === 'number',
                })}
                className='w-full p-2 border rounded bg-white text-gray-900 placeholder-gray-400'
            />
        )}
        {error && <p className='text-red-500 text-sm mt-1'>{error.message}</p>}
    </div>
);
