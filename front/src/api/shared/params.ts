import { QueryParams } from "@/types/shared/pagination"

export const createParams = <T extends Record<string, any>>(
  params?: T & Partial<QueryParams>
): string => {
  const search = new URLSearchParams()

  if (!params) return ""

  const defaultParams: QueryParams = {
    page: 1,
    size: 10,
    orderBy: "criadoEm",
    order: "asc",
  }

  const merge = { ...defaultParams, ...params }

  Object.entries(merge).forEach(([key, value]) => {
    if (value != undefined && value != null && value != "") {
      if (value instanceof Date) {
        search.append(key, value.toISOString())
      } else {
        search.append(key, String(value))
      }
    }
  })

  const finalParams = "?" + search.toString()

  return finalParams
}
