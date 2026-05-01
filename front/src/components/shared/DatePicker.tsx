'use client'

import { EditCalendarOutlined } from '@mui/icons-material'
import { format } from 'date-fns'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { PopoverTrigger, PopoverContent, Popover } from '../ui/popover'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'

interface Props<TFieldValues extends FieldValues> {
    control: Control<TFieldValues>
    name: Path<TFieldValues>
}

export function DatePicker<TFieldValues extends FieldValues>(props: Props<TFieldValues>) {
    return (
        <Controller
            name={props.name}
            control={props.control}
            render={({ field }) => (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            id={props.name ? props.name : 'date'}
                            className="w-full justify-start text-left font-normal"
                        >
                            <EditCalendarOutlined className="mr-2 h-4 w-4" />
                            {field.value ? (
                                format(
                                    new Date(field.value + 'T12:00:00'),
                                    'dd/MM/yyyy'
                                )
                            ) : (
                                <span>Escolha uma data</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            captionLayout="dropdown"
                            selected={
                                field.value
                                    ? new Date(field.value + 'T12:00:00')
                                    : undefined
                            }
                            onSelect={(date) => {
                                if (date) {
                                    field.onChange(format(date, 'yyyy-MM-dd'))
                                }
                            }}
                            className="rounded-lg border"
                        />
                    </PopoverContent>
                </Popover>
            )}
        />
    )
}
