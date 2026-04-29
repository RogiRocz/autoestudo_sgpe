'use client'

import { Button } from '../ui/button'
import { Visibility, VisibilityOff } from '@mui/icons-material'

interface Props {
    value: boolean
    onChange: (v: boolean) => void
}

export function HideInput({ value, onChange }: Props) {
    return (
        <div>
            <Button
                size={'icon-sm'}
                type="button"
                variant={'outline'}
                className="border-none border-transparent bg-transparent text-white"
                onClick={() => onChange(!value)}
            >
                {value ? (
                    <VisibilityOff sx={{ fontSize: 14 }} />
                ) : (
                    <Visibility sx={{ fontSize: 14 }} />
                )}
            </Button>
        </div>
    )
}
