import { useAuthStore } from '@/store/auth.store'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import CardContent from '@mui/material/CardContent'
import { TIPO_USUARIO } from '@/types/enums/enums'

interface Props {
    entity: string
}

export function RegisterSessions(props: Props) {
    const userStore = useAuthStore()
    const { user } = userStore

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Agendar uma sessão</CardTitle>
                    <CardDescription>
                        Preencha as informações para agendar sua sessão
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {user?.type === TIPO_USUARIO.ALUNO && <></>}
                </CardContent>
            </Card>
        </>
    )
}
