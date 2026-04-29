'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { FieldGroup, Field, FieldLabel } from '../ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group'
import {
    prontuarioDefaultValues,
    prontuarioFieldsSchema,
    ProntuarioRegisterForms,
} from '@/utils/schemas.validator'
import { zodResolver } from '@hookform/resolvers/zod'

export function AlunoRegisterSession() {
    

    return (
        <>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="id1">Campo 1</FieldLabel>
                    <InputGroup>
                        <InputGroupAddon>
                            <div></div>
                        </InputGroupAddon>
                        <InputGroupInput id="id1"></InputGroupInput>
                    </InputGroup>
                </Field>
                <Field>
                    <FieldLabel htmlFor="id2">Campo 2</FieldLabel>
                    <InputGroup>
                        <InputGroupAddon>
                            <div></div>
                        </InputGroupAddon>
                        <InputGroupInput id="id2"></InputGroupInput>
                    </InputGroup>
                </Field>
                <Field>
                    <FieldLabel htmlFor="id3">Campo 3</FieldLabel>
                    <InputGroup>
                        <InputGroupAddon>
                            <div></div>
                        </InputGroupAddon>
                        <InputGroupInput id="id3"></InputGroupInput>
                    </InputGroup>
                </Field>
                <Field>
                    <FieldLabel htmlFor="id4">Campo 4</FieldLabel>
                    <InputGroup>
                        <InputGroupAddon>
                            <div></div>
                        </InputGroupAddon>
                        <InputGroupInput id="id4"></InputGroupInput>
                    </InputGroup>
                </Field>
                <Field>
                    <FieldLabel htmlFor="id5">Campo 5</FieldLabel>
                    <InputGroup>
                        <InputGroupAddon>
                            <div></div>
                        </InputGroupAddon>
                        <InputGroupInput id="id5"></InputGroupInput>
                    </InputGroup>
                </Field>
                <Field>
                    <FieldLabel htmlFor="id6">Campo 6</FieldLabel>
                    <InputGroup>
                        <InputGroupAddon>
                            <div></div>
                        </InputGroupAddon>
                        <InputGroupInput id="id6"></InputGroupInput>
                    </InputGroup>
                </Field>
                <Field>
                    <FieldLabel htmlFor="id7">Campo 7</FieldLabel>
                    <InputGroup>
                        <InputGroupAddon>
                            <div></div>
                        </InputGroupAddon>
                        <InputGroupInput id="id7"></InputGroupInput>
                    </InputGroup>
                </Field>
            </FieldGroup>
        </>
    )
}
