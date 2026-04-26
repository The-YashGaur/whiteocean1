export function ProductSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800">
      <div className="aspect-square skeleton" />
      <div className="p-5 space-y-3">
        <div className="h-4 w-20 skeleton rounded" />
        <div className="h-5 w-full skeleton rounded" />
        <div className="h-5 w-3/4 skeleton rounded" />
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4 skeleton rounded-full" />
          ))}
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 w-24 skeleton rounded" />
          <div className="h-10 w-10 skeleton rounded-xl" />
        </div>
      </div>
    </div>
  )
}
