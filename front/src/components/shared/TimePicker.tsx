'use client'

import { Input } from '../ui/input'

const MINUTE = 60

interface Props {
    id: string
    step?: number
}

export function TimePicker(props: Props = { step: 15 * MINUTE, id: 'timer' }) {
    return (
        <Input
            type="time"
            id={props.id}
            step={props.step}
            defaultValue={'08:00:00'}
			className='w-fit'
        />
    )
}
