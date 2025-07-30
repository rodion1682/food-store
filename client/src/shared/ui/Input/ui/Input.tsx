import { classNames, Mods } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';
import {
	InputHTMLAttributes,
	memo,
	ChangeEvent,
	useState,
	useEffect,
	useRef,
	CSSProperties,
} from 'react';
import { useTranslation } from 'react-i18next';
import { SvgIcon } from 'shared/ui/SvgIcon/ui/SvgIcon';
import SearchIcon from 'shared/assets/icons/search.svg';
import EyeIcon from 'shared/assets/icons/eye.svg';
import EyeSlashIcon from 'shared/assets/icons/eye-slash.svg';
import { Button, ButtonTheme } from 'shared/ui/Button';

export enum InputTheme {
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
	PASSWORD_INPUT = 'password_input',
	SEARCH_INPUT = 'search_input',
	EURO = 'euro',
	PRICE_RANGE = 'price_range',
	PRICE_INPUT = 'price_input',
	TEXTAREA = 'textarea',
}

export enum InputType {
	TEXT = 'text',
	NUMBER = 'number',
	PASSWORD = 'password',
	RANGE = 'range',
}

type HTMLInputProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'value' | 'onChange' | 'readonly'
>;

export type ChangeValue = string | number;

interface InputProps extends HTMLInputProps {
	className?: string;
	value?: string | number;
	onChange?: (value: ChangeValue) => void;
	type?: InputType;
	theme?: InputTheme;
	readonly?: boolean;
	label?: string;
	autofocus?: boolean;
	autocomplete?: string;
	textarea?: boolean;
	height?: string | number;
}

export const Input = memo((props: InputProps) => {
	const { t } = useTranslation();
	const {
		className,
		value,
		onChange,
		placeholder = t('Enter text'),
		type = InputType.TEXT,
		theme = InputTheme.PRIMARY,
		autofocus,
		readonly,
		label,
		autocomplete,
		textarea,
		height,
		...otherProps
	} = props;
	const ref = useRef<HTMLInputElement>(null);
	const [isFocused, setIsFocused] = useState(false);
	const [isPassword, setIsPassword] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const hasValue = value !== '' && value !== undefined && value !== null;

	const passwordVisibleHandler = () => {
		setIsVisible((prev) => !prev);
	};

	const onChangeHandler = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const raw = e.target.value;
		const val = type === InputType.NUMBER ? Number(raw) || 0 : raw;
		onChange?.(val);
	};

	useEffect(() => {
		if (autofocus) {
			setIsFocused(true);
			ref.current?.focus();
		}
	}, [autofocus]);

	useEffect(() => {
		if (type === InputType.PASSWORD) {
			setIsPassword(true);
		}
	}, [type]);

	const onBlur = () => {
		setIsFocused(false);
	};

	const onFocus = () => {
		setIsFocused(true);
	};

	const mods: Mods = {
		[cls.Input_readonly]: readonly,
		[cls.Input_focus]: isFocused,
		[cls.Input_hasValue]: hasValue,
		[cls.Input_textarea]: textarea,
	};

	const styles: CSSProperties = {
		height,
	};

	return (
		<div
			className={classNames(cls.Input, mods, [className, cls[theme]])}
			style={styles}
		>
			{theme === InputTheme.SEARCH_INPUT && (
				<SvgIcon className={cls.Input__icon} children={<SearchIcon />} />
			)}
			{label && (
				<label className={cls.Input__label} htmlFor={label}>
					{label}
				</label>
			)}
			{textarea ? (
				<textarea
					style={styles}
					type={
						type === InputType.PASSWORD
							? isVisible === true
								? InputType.TEXT
								: InputType.PASSWORD
							: type
					}
					value={hasValue ? value : ''}
					onChange={onChangeHandler}
					// @ts-ignore: TS2322
					onFocus={onFocus}
					// @ts-ignore: TS2322
					onBlur={onBlur}
					readOnly={readonly}
					id={label}
					autoComplete={autocomplete}
					{...otherProps}
				/>
			) : (
				<input
					ref={ref}
					type={
						type === InputType.PASSWORD
							? isVisible === true
								? InputType.TEXT
								: InputType.PASSWORD
							: type
					}
					value={hasValue ? value : ''}
					onChange={onChangeHandler}
					onFocus={onFocus}
					onBlur={onBlur}
					readOnly={readonly}
					id={label}
					autoComplete={autocomplete}
					{...otherProps}
				/>
			)}

			{isPassword && (
				<Button
					onClick={passwordVisibleHandler}
					theme={ButtonTheme.PASSWORD}
					className={cls.Input__password}
				>
					<SvgIcon children={isVisible ? <EyeIcon /> : <EyeSlashIcon />} />
				</Button>
			)}
		</div>
	);
});
