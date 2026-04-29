import { SystemEnumsResponse } from "@/types/enums/config.interface"
import { apiFetch } from "../shared/config"

const routeName = 'config'

export const ConfigService = {
    getEnums: async () => apiFetch<SystemEnumsResponse>(`${routeName}`)
}