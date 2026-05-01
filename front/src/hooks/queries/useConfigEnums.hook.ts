import { ConfigService } from '@/api/config/config.api'
import { useQuery } from '@tanstack/react-query'

const tableKey = 'config'

export const useConfigEnums = () => {
    return useQuery({
        queryKey: [tableKey, 'getAll'],
        queryFn: async () => {
            return ConfigService.getEnums()
        },
    })
}
