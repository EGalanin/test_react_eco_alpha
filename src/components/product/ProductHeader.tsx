import Link from 'next/link';

interface ProductHeaderProps {
  title: string;
  backUrl?: string;
}

export function ProductHeader({ title, backUrl = '/' }: ProductHeaderProps) {
  return (
    <div className="flex justify-between items-center gap-4 mb-4">
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl font-bold truncate" title={title}>
          {title}
        </h1>
      </div>
      <Link
        href={backUrl}
        className="flex-shrink-0 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors whitespace-nowrap"
      >
        Назад к списку
      </Link>
    </div>
  );
}
