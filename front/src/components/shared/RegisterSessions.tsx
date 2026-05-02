import { useAuthStore } from '@/store/auth.store'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
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
import { Field } from '../ui/field'
import { InputGroup } from '../ui/input-group'
import { Button } from '../ui/button'

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
            <form
                id="sessionForm"
                onSubmit={handleSubmit(onSubmit)}
                onReset={() => reset(prontuarioDefaultValues)}
            >
                <Card>
                    <CardHeader>
                        <CardTitle>Agendar uma sessão</CardTitle>
                        <CardDescription>
                            Preencha as informações para agendar sua sessão
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {user?.type === TIPO_USUARIO.ALUNO ? (
                            <AlunoRegisterSession />
                        ) : (
                            <PacienteRegisterSession />
                        )}
                    </CardContent>
                    <CardFooter>
                        <InputGroup>
                            <Field>
                                <Button form="sessionForm" type="submit">
                                    Agendar
                                </Button>
                                <Button type="reset">Resetar campos</Button>
                            </Field>
                        </InputGroup>
                    </CardFooter>
                </Card>
            </form>
        </FormProvider>
    )
}
