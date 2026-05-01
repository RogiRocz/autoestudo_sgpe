'use client'

import { EditCalendarOutlined } from '@mui/icons-material'
import { format, isValid, parseISO } from 'date-fns'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { PopoverTrigger, PopoverContent, Popover } from '../ui/popover'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'

interface Props<TFieldValues extends FieldValues> {
    control: Control<TFieldValues>
    name: Path<TFieldValues>
}

export function DatePicker<TFieldValues extends FieldValues>(
    props: Props<TFieldValues>
) {
    const getSafeDate = (value: any) => {
        if (!value) return null

        const date =
            typeof value === 'string' ? parseISO(value) : new Date(value)
        return isValid(date) ? date : null
    }

    return (
        <Controller
            name={props.name}
            control={props.control}
            render={({ field }) => {
                const dateValue = getSafeDate(field.value)

                return (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                id={props.name}
                                className="justify-start text-left font-normal"
                                type="button"
                            >
                                <EditCalendarOutlined className="mr-2 h-4 w-4" />
                                {dateValue ? (
                                    format(dateValue, 'dd/MM/yyyy')
                                ) : (
                                    <span>Escolha uma data</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0" align="start">
                            <Calendar
                                mode="single"
                                captionLayout="dropdown"
                                selected={dateValue || undefined}
                                onSelect={(date) => {
                                    if (date) {
                                        field.onChange(
                                            format(date, 'yyyy-MM-dd')
                                        )
                                    }
                                }}
                                className="rounded-lg border"
                            />
                        </PopoverContent>
                    </Popover>
                )
            }}
        />
    )
}
