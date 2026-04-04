import { Prontuario } from "@/types/prontuario/prontuario.interface"
import { createBaseService } from "../shared/baseService"
import { UpdateProntuarioDTO } from "@/types/prontuario/prontuario.dto"
import { LOCAL_SESSAO, PRONTUARIO_STATUS, TIPO_USUARIO } from "@/types/enums/enums"
import { PaginationResponse, QueryParams } from "@/types/shared/pagination"
import { apiFetch } from "../shared/config"
import { createParams } from "../shared/params"
import { OwnerData } from "@/types/shared/ownerData"
import { SearchDate } from "@/types/shared/SearchDate"

const routeName = 'prontuarios'

const baseMethods = createBaseService<Prontuario, UpdateProntuarioDTO>(routeName)

export const ProntuarioService = {
    ...baseMethods,

    getProntuarios: async (type: TIPO_USUARIO, id: string, queries?: QueryParams) => {
        const url = `${routeName}/${type}/${id}${createParams(queries)}`
        return apiFetch<PaginationResponse<Prontuario>>(url)
    },

    findByLocal: async (local: LOCAL_SESSAO, queries?: QueryParams, owner?: OwnerData) => {
        const url = `${routeName}/local/${local}${createParams({...queries, ...owner})}`
        return apiFetch<PaginationResponse<Prontuario>>(url)
    },

    findByStatus: async (status: PRONTUARIO_STATUS, queries?: QueryParams, owner?: OwnerData) => {
        const url = `${routeName}/status/${status}${createParams({ ...queries, ...owner })}`
        return apiFetch<PaginationResponse<Prontuario>>(url)
    },

    findByIntervalTime: async (dates: SearchDate, queries?: QueryParams, owner?: OwnerData) => {
        const url = `${routeName}/datas/${createParams({ ...queries, ...dates, ...owner })}`
        return apiFetch<PaginationResponse<Prontuario>>(url)
    }
}