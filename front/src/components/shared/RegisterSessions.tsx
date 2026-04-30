import { useAuthStore } from '@/store/auth.store'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import CardContent from '@mui/material/CardContent'
import { TIPO_USUARIO } from '@/types/enums/enums'
import {
    ProntuarioRegisterForms,
    prontuarioFieldsSchema,
    prontuarioDefaultValues,
} from '@/utils/schemas.validator'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { AlunoRegisterSession } from './AlunoRegisterSession'
import { PacienteRegisterSession } from './PacienteRegisterSession'

interface Props {
    entity?: string
}

export function RegisterSessions(props: Props) {
    const userStore = useAuthStore()
    const { user } = userStore

    const methods = useForm<ProntuarioRegisterForms>({
        resolver: zodResolver(prontuarioFieldsSchema),
        defaultValues: prontuarioDefaultValues,
        mode: 'onBlur',
    })

    const { reset, handleSubmit } = methods

    const onSubmit: SubmitHandler<ProntuarioRegisterForms> = (data) => {}

    return (
        <FormProvider {...methods}>
            <Card>
                <CardHeader>
                    <CardTitle>Agendar uma sessão</CardTitle>
                    <CardDescription>
                        Preencha as informações para agendar sua sessão
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {user?.type === TIPO_USUARIO.PACIENTE ? (
                        <AlunoRegisterSession />
                    ) : (
                        <PacienteRegisterSession />
                    )}
                </CardContent>
            </Card>
        </FormProvider>
    )
}
