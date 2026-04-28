import { Prontuario } from "@/types/prontuario/prontuario.interface"
import { createBaseService } from "../shared/baseService"
import { UpdateProntuarioDTO } from "@/types/prontuario/prontuario.dto"
import {
  LOCAL_SESSAO,
  PRONTUARIO_STATUS,
  TIPO_USUARIO,
} from "@/types/enums/enums"
import { PaginationResponse, QueryParams } from "@/types/shared/pagination"
import { apiFetch } from "../shared/config"
import { createParams } from "../shared/params"
import { OwnerData } from "@/types/shared/ownerData"
import { SearchDate } from "@/types/shared/searchDate"

const routeName = "prontuarios"

const baseMethods = createBaseService<Prontuario, UpdateProntuarioDTO>(
  routeName
)

export const ProntuarioService = {
  ...baseMethods,

  getProntuarios: async (
    type: TIPO_USUARIO,
    id: string,
    queries?: QueryParams
  ): Promise<PaginationResponse<Prontuario>> => {
    const path = `${routeName}/${type}/${id}`
    const params = createParams(queries)
    return apiFetch<PaginationResponse<Prontuario>>(`${path}${params}`)
  },

  findByLocal: async (
    local: LOCAL_SESSAO,
    queries?: QueryParams,
    owner?: OwnerData
  ): Promise<PaginationResponse<Prontuario>> => {
    const path = `${routeName}/local/${local}`
    const params = createParams({ ...queries, ...owner })
    return apiFetch<PaginationResponse<Prontuario>>(`${path}${params}`)
  },

  findByStatus: async (
    status: PRONTUARIO_STATUS,
    queries?: QueryParams,
    owner?: OwnerData
  ): Promise<PaginationResponse<Prontuario>> => {
    const path = `${routeName}/status/${status}`
    const params = createParams({ ...queries, ...owner })
    return apiFetch<PaginationResponse<Prontuario>>(`${path}${params}`)
  },

  findByIntervalTime: async (
    dates: SearchDate,
    queries?: QueryParams,
    owner?: OwnerData
  ): Promise<PaginationResponse<Prontuario>> => {
    const path = `${routeName}/datas/`
    const params = createParams({ ...queries, ...dates, ...owner })
    return apiFetch<PaginationResponse<Prontuario>>(`${path}${params}`)
  },
}
