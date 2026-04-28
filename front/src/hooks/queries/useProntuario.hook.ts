import { ProntuarioService } from "@/api/prontuario/prontuario.api"
import { QueryParams } from "@/types/shared/pagination"
import { useQuery } from "@tanstack/react-query"
import { useAuthUser } from "./useAuthUser.hook"
import { LOCAL_SESSAO, PRONTUARIO_STATUS } from "@/types/enums/enums"
import { MAP_TIPO_DONO, OwnerData } from "@/types/shared/ownerData"
import { SearchDate } from "@/types/shared/searchDate"

export const useProntuarios = (params?: QueryParams) => {
  const { user, isAuthenticated } = useAuthUser()

  return useQuery({
    queryKey: ["prontuarios", user?.uuid, params],
    queryFn: () =>
      ProntuarioService.getProntuarios(user!.type, user!.uuid, params),
    enabled: isAuthenticated,
  })
}

export const useProntuariosByLocal = (
  local: LOCAL_SESSAO,
  params?: QueryParams
) => {
  const { user, isAuthenticated } = useAuthUser()
  const owner: OwnerData = {
    tipoDono: MAP_TIPO_DONO[user!.type],
    donoId: user!.uuid,
  }

  return useQuery({
    queryKey: ["prontuarios", local, owner.donoId],
    queryFn: () => ProntuarioService.findByLocal(local, params, owner),
    enabled: isAuthenticated,
  })
}

export const useProntuariosByStatus = (
  status: PRONTUARIO_STATUS,
  params?: QueryParams
) => {
  const { user, isAuthenticated } = useAuthUser()
  const owner: OwnerData = {
    tipoDono: MAP_TIPO_DONO[user!.type],
    donoId: user!.uuid,
  }

  return useQuery({
    queryKey: ["prontuarios", status, owner.donoId],
    queryFn: () => ProntuarioService.findByStatus(status, params, owner),
    enabled: isAuthenticated,
  })
}

export const useProntuariosByTime = (
  dates: SearchDate,
  params?: QueryParams
) => {
  const { user, isAuthenticated } = useAuthUser()
  const owner: OwnerData = {
    tipoDono: MAP_TIPO_DONO[user!.type],
    donoId: user!.uuid,
  }

  return useQuery({
    queryKey: ["prontuarios", dates.startDate, dates.endDate, owner.donoId],
    queryFn: () => ProntuarioService.findByIntervalTime(dates, params, owner),
    enabled: isAuthenticated,
  })
}
