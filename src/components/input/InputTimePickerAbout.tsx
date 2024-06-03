
import { Popover, Menu } from 'antd'
import MenuItem from 'antd/es/menu/MenuItem'
import BaseText from '../text'
import { useRef, useState } from 'react'

const hoursOptions = Array.from({ length: 24 }, (_, i) => i)
const minutesOptions = Array.from({ length: 60 }, (_, i) => i)

interface TimePickerProps {
	withTomorrow?: boolean
	time: { hour: number; minute: number }
	setTime: React.Dispatch<
		React.SetStateAction<{ hour: number; minute: number }>
	>
}

export const InputTimePicker: React.FC<TimePickerProps> = ({
	time,
	withTomorrow = false,
	setTime,
}) => {
	const hourRef: any = useRef(null)
	const minRef: any = useRef(null)
	const [isHourFocused, setIsHourFocused] = useState(false)
	const [isMinFocused, setIsMinFocused] = useState(false)

	const handleHourChange = (value: any) => {
		setTime({ ...time, hour: value })
	}

	const handleMinuteChange = (value: any) => {
		setTime({ ...time, minute: value })
	}

	const handleHourInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value, 10)
		if (!isNaN(value) && value >= 0 && value < 24) {
			setTime({ ...time, hour: value })
		}
	}

	const handleMinuteInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value, 10)
		if (!isNaN(value) && value >= 0 && value < 60) {
			setTime({ ...time, minute: value })
		}
	}

	const handleHourFocus = () => {
		setIsHourFocused(true)
	}

	const handleHourBlur = () => {
		setTimeout(() => {
			setIsHourFocused(false)
		}, 300)
	}

	const handleMinFocus = () => {
		setIsMinFocused(true)
	}

	const handleMinBlur = () => {
		setTimeout(() => {
			setIsMinFocused(false)
		}, 300)
	}
	return (
		<div className='flex flex-row items-center'>
			<Popover
				content={
					<div className='max-h-[400px] overflow-auto rounded-lg'>
						<Menu selectedKeys={[time.hour.toString()]}>
							{(withTomorrow
								? [...hoursOptions, ...hoursOptions]
								: hoursOptions
							).map((hour, index) => (
								<MenuItem
									key={hour}
									onClick={() => handleHourChange(hour)}
								>
									<BaseText
										size={16}
										bold
										color={index > 23
											? 'text-primary'
											: 'text-black'}
									>
										{String(hour).padStart(2, '0')}
									</BaseText>
								</MenuItem>
							))}
						</Menu>
					</div>
				}
				trigger='click'
				open={isHourFocused}
			>
				<input
					onFocus={handleHourFocus}
					onBlur={handleHourBlur}
					ref={hourRef}
					onKeyDown={(e: any) => {
						if (e.key === 'Enter') {
							handleHourBlur()
							hourRef?.current?.blur()
						}
					}}
					value={String(time.hour).padStart(2, '0')}
					onChange={handleHourInputChange}
					className='cursor-pointer w-[28px] h-[28px] text-base font-bold text-center focus:bg-[#E8E8E8] focus:border hover:bg-[#E8E8E8] hover:border rounded-md'
				/>
			</Popover>
			<BaseText bold>:</BaseText>
			<Popover
				content={
					<div className='max-h-[400px] overflow-auto rounded-lg'>
						<Menu selectedKeys={[time.minute.toString()]}>
							{minutesOptions.map((minute) => (
								<MenuItem
									key={minute}
									style={{
										color: 'black',
										fontSize: 16,
										fontWeight: '700',
									}}
									onClick={() => handleMinuteChange(minute)}
								>
									{String(minute).padStart(2, '0')}
								</MenuItem>
							))}
						</Menu>
					</div>
				}
				trigger='click'
				open={isMinFocused}
			>
				<input
					onFocus={handleMinFocus}
					onBlur={handleMinBlur}
					ref={minRef}
					onKeyDown={(e: any) => {
						if (e.key === 'Enter') {
							handleMinBlur()
							minRef?.current?.blur()
						}
					}}
					value={String(time.minute).padStart(2, '0')}
					onChange={handleMinuteInputChange}
					className='cursor-pointer w-[28px] h-[28px] text-base font-bold text-center focus:bg-[#E8E8E8] focus:border hover:bg-[#E8E8E8] hover:border rounded-md'
				/>
			</Popover>
		</div>
	)
}