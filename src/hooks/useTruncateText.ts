import { useMemo } from 'react';

export const useTruncateText = (text: string, maxLength: number): string => {
    return useMemo(() => {
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    }, [text, maxLength]);
};
