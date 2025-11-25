import { toast } from 'react-hot-toast';

interface ErrorHandlerProps {
    error: unknown;
    defaultMessage?: string;
    className?: string;
    showToast?: boolean;
}

export function ErrorHandler({
    error,
    defaultMessage = 'Произошла неизвестная ошибка',
    className = 'text-red-500 text-center py-8',
    showToast = true,
}: ErrorHandlerProps) {
    const errorMessage =
        'status' in (error as any)
            ? `Ошибка ${(error as any).status}: ${JSON.stringify((error as any).data)}`
            : defaultMessage;

    if (showToast) {
        toast.error(`Ошибка: ${errorMessage}`);
    }

    return <div className={className}>{errorMessage}</div>;
}
