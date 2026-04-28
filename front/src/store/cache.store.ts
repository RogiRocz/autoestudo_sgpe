import { create } from "zustand"

interface CacheEntry<T = any> {
  data: T
  key: string
  params: string
  timestamp: number
}

interface AppCacheState {
  // Estrutura: cache[URL_BASE][PARAMS_STRING]
  cache: Record<string, Record<string, CacheEntry>>
  history: { key: string; params: string }[]
  maxItems: number

  // Actions
  save: <T>(key: string, params: string, data: T) => void
  get: <T>(key: string, params: string) => T | null
  invalidateKey: (key: string) => void
  clearAll: () => void
}

export const useAppCache = create<AppCacheState>((set, get) => ({
  cache: {},
  history: [],
  maxItems: 10,

  save: (key, params, data) =>
    set((state) => {
      const newCache = { ...state.cache }

      if (!newCache[key]) {
        newCache[key] = {}
      }

      newCache[key][params] = {
        data,
        key,
        params,
        timestamp: Date.now(),
      }

      const filteredHistory = state.history.filter(
        (h) => !(h.key === key && h.params === params)
      )
      const newHistory = [{ key, params }, ...filteredHistory]

      if (newHistory.length > state.maxItems) {
        const oldest = newHistory.pop()
        if (oldest && newCache[oldest.key]) {
          delete newCache[oldest.key][oldest.params]

          if (Object.keys(newCache[oldest.key]).length === 0) {
            delete newCache[oldest.key]
          }
        }
      }

      return { cache: newCache, history: newHistory }
    }),

  get: (key, params) => {
    return get().cache[key]?.[params]?.data || null
  },

  invalidateKey: (key) =>
    set((state) => {
      const newCache = { ...state.cache }
      delete newCache[key]

      return {
        cache: newCache,
        history: state.history.filter((h) => h.key !== key),
      }
    }),

  clearAll: () => set({ cache: {}, history: [] }),
}))
