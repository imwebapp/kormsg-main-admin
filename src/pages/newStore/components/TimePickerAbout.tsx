import React, { useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import '../index.css'
import { BaseText } from '../../../components'
import { InputTimePicker } from '../../../components/input/InputTimePickerAbout'
const format = 'HH:mm'

const TimePickerAbout = (props: {
    startTime: string
    setStartTime: (e: string) => void
    endTime: string
    setEndTime: (e: string) => void
}) => {
    const [start, setStart] = useState<{ hour: number; minute: number }>({
        hour: 0,
        minute: 0,
    })
    const [end, setEnd] = useState<{ hour: number; minute: number }>({
        hour: 0,
        minute: 0,
    })

    function convertTimeStringToObj(timeString: string) {
        const [hourStr, minuteStr] = timeString.split(':')
        const hour = parseInt(hourStr, 10)
        const minute = parseInt(minuteStr, 10)
        return {
            hour: hour || 0,
            minute: minute || 0,
        }
    }

    function convertTimeObjToString(timeObj: any) {
        const hourStr = String(timeObj.hour || 0).padStart(2, '0')
        const minuteStr = String(timeObj.minute || 0).padStart(2, '0')
        return `${hourStr}:${minuteStr}`
    }

    useEffect(() => {
        setStart(convertTimeStringToObj(props.startTime))
        setEnd(convertTimeStringToObj(props.endTime))
    }, [props])

    return (
        <div className='w-full gap-2 px-3 h-[44px] border border-[#d9d9d9] rounded-md flex flex-row items-center justify-center '>
            <InputTimePicker
                time={start}
                setTime={(data: any) => {
                    props.setStartTime(convertTimeObjToString(data))
                }}
            />
            <BaseText bold color='#A1A1A1'>~</BaseText>
            <InputTimePicker
                time={end}
                withTomorrow
                setTime={(data: any) => {
                    props.setEndTime(convertTimeObjToString(data))
                }}
            />
        </div>
    )
}

export default TimePickerAbout