import { useState, useCallback } from 'react'

interface UseAsyncOptions {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export function useAsync<T>(
  callback: () => Promise<T>,
  options?: UseAsyncOptions
) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState<T | null>(null)

  const execute = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await callback()
      setData(result)
      options?.onSuccess?.()
      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error')
      setError(error)
      options?.onError?.(error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [callback, options])

  return { loading, error, data, execute }
}
