import React, { useEffect, useRef, useState } from "react";
import styles from './index.module.css';
import classNames from "classnames";
import { Customcheckbox } from "../checkbox/primary";
import { COLOR } from "@/styles/color";
import DatePicker from "react-multi-date-picker";
//@ts-ignore
import transition from "react-element-popper/animations/transition";
//@ts-ignore
import opacity from "react-element-popper/animations/opacity";
import { FontSize } from "@/styles/font";
import moment from "moment";

interface IProps {
	open?: boolean;
	headerClassName?: string;
	titleClassName?: string;
	iconButtonClassName?: string;
	contentClassName?: string;
	contentContainerClassName?: string;
	collapsibleClassName?: string;
	data?: any;
}

const TaskItem: React.FC<IProps> = ({
	data,
	open,
	collapsibleClassName = "collapsible-card-edonec",
	headerClassName = "collapsible-header-edonec",
	titleClassName = "title-text-edonec",
	iconButtonClassName = "collapsible-icon-button-edonec",
	contentClassName = "collapsible-content-edonec",
	contentContainerClassName = "collapsible-content-padding-edonec",
}) => {
	const [isOpen, setIsOpen] = useState(open);
	const [height, setHeight] = useState<string | undefined>(open ? undefined : "0");

	const [startDate, setStartDate]: any = useState();
	const [isClosedData, setIsClosedData] = useState(data.isClosed);
	const [description, setDescription] = useState(data.task);
	const [isMoreOptions, setIsMoreOptions] = useState(false);

	const ref = useRef<HTMLDivElement>(null);
	const inputRef = useRef(null);

	const handleFilterOpening = () => {
		setIsOpen((prev) => !prev);
	};

	useEffect(function() {
		if(data.date.length != 0) {
			setStartDate(new Date(data.date * 1000));
		} 
	}, []);
	
	useEffect(() => {
		if (!height || !isOpen || !ref.current) return undefined;
		const resizeObserver = new ResizeObserver((el) => {
		// @ts-ignore
			setHeight(el[0].contentRect.height);
		});
		resizeObserver.observe(ref.current);
		return () => {
			resizeObserver.disconnect();
		};
	}, [height, isOpen]);

	useEffect(() => {
		if (isOpen) setHeight(ref.current?.getBoundingClientRect().height.toString());
		else setHeight("0");
	}, [isOpen]);

	function handleInput(val: any) {
		setDescription(val.target.value);
	}

	function handleClickDescription() {
		//@ts-ignore;
		inputRef.current.focus();
	}

	function handleMoreOptions() {
		setIsMoreOptions(!isMoreOptions);
	}

	function renderDatePicker() {
		return (
			<DatePicker 
				value={startDate}
				onChange={setStartDate}
				arrow={false}
				render={<CustomInput/>}
				format={"DD/MM/YYYY"}
				animations={[
					opacity(),
					transition({
					from: 40,
					transition: "all 300ms cubic-bezier(0.335, 1.010, 0.030, 1.360)",
					}),
				]} 
				mapDays={({ date, today, selectedDate, currentMonth, isSameDate }) => {
					let props = {}

					// @ts-ignore
					props.style = {
						borderRadius: "50%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",

					}
					// @ts-ignore
					if (isSameDate(date, today)) props.style.color = "#2F80ED"
					// @ts-ignore
					if (isSameDate(date, selectedDate)) props.style = {
						// @ts-ignore
						...props.style,
						color: "#0074d9",
						backgroundColor: "transparent",
						borderRadius: "50%",
						fontWeight: "bold",
						border: "1px solid #2F80ED"
					}

					return props
				}}
			/>
		)
	}

	function CustomInput({ onFocus, value, onChange }: any) {
		return (
			<div className={"container-default-input"}>
				<input
					onFocus={onFocus}
					value={value}
					onChange={onChange}
					placeholder="Set New Date"
					className={"default-input"}
				/>
				<img src={"icons/calendar_outlined.svg"}/>
			</div>
		)
	}

	return (
		<div className={collapsibleClassName} style={{justifyContent: "center"}}>
			<div className={classNames(styles.containerItem)}>
				<div className={styles.innerItem}>
					<div className={styles.leftContent}>
						<div style={{marginTop: "3px"}}>
							<Customcheckbox 
								isChecked={data.isClosed} 
								onChange={() => setIsClosedData(!isClosedData)}
							/>
						</div>
						<div 
							className={styles.contentInfo} 
							style={{
								textDecoration: isClosedData ? "line-through" : "unset"
							}}
							onClick={handleFilterOpening}
						>
							{data.title}
						</div>
					</div>
					<div className={styles.rightContent} onClick={handleFilterOpening}>
						<span className={"fontLarge"} style={{ color: COLOR.redColorIndicator, }} >
							{data.isClosed != true ? data.time : ""}
						</span>
						<span className={"fontLarge"} style={{ color: COLOR.primaryGreyColor1 }} >
							{startDate != undefined ? moment(startDate).format("DD/MM/YYYY") : ""}
						</span>
						<button
							type="button"
							className={iconButtonClassName}
							onClick={handleFilterOpening}
						>
							<img
								src={"icons/expandMore.svg"}
								className={classNames(
									"iconCollapse",
									{ 'flip': isOpen }
								)}
							/>
						</button>
					</div>
					<div className={styles.moreOptions}>
						<img
							onClick={handleMoreOptions}
							src={"icons/more.svg"}
						/>
						{isMoreOptions ? <button>
								Delete
						</button> : null}
					</div>
				</div>
			</div>
			<div className={contentClassName} style={{ height }}>
				<div ref={ref}>
					<div className={contentContainerClassName}>
						{/* {children} */}
						<div className={classNames(styles.body)}>
							<div className={"row"} style={{gap: '10px'}}>
								<img 
									src={startDate != undefined ? "icons/schedule_outlined_blue.svg" : "icons/schedule_outlined.svg"} 
									style={{
										width: '20px',
									}}
								/>
								{renderDatePicker()}
							</div>
							<form 
								className="row" 
								onClick={()=> handleClickDescription()}
								style={{
									alignItems: 'start',
									gap: "10px", 
									marginTop: '20px', 
									width:"100%",
									cursor: "pointer",
								}}
								onChange={(val: any) => handleInput(val)}
							>
								<img 
									src={description ? "icons/pen_outlined_blue.svg" : "icons/pen_outlined.svg"} 
									style={{
										marginTop: "10px",
										transition: "all 0.3s linear"
									}}
								/>
								<textarea 
									ref={inputRef}
									className={styles.input} 
									defaultValue={description}
									value={description}
									rows={description.length != 0 ? 4 : 0}
									placeholder={"No Description"}
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TaskItem;
