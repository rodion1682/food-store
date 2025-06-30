import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';
import {
	InputHTMLAttributes,
	memo,
	ChangeEvent,
	useState,
	useEffect,
} from 'react';
import { useTranslation } from 'react-i18next';
import { SvgIcon } from 'shared/ui/SvgIcon/ui/SvgIcon';
import SearchIcon from 'shared/assets/icons/search.svg';
import EyeIcon from 'shared/assets/icons/eye.svg';
import EyeSlashIcon from 'shared/assets/icons/eye-slash.svg';
import { Button, ButtonTheme } from 'shared/ui/Button';

export enum InputTheme {
	MAIN_INPUT = 'main_input',
	PASSWORD_INPUT = 'password_input',
	SEARCH_INPUT = 'search_input',
	EURO = 'euro',
	PRICE_RANGE = 'price_range',
	PRICE_INPUT = 'price_input',
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

type ChangeValue = string | number;

interface InputProps extends HTMLInputProps {
	className?: string;
	value?: string | number;
	onChange?: (value: ChangeValue) => void;
	type?: InputType;
	placeholder?: string;
	theme?: InputTheme;
	readonly?: boolean;
	label?: string;
	labelId?: string;
}

export const Input = memo((props: InputProps) => {
	const { t } = useTranslation();
	const {
		className,
		value,
		onChange,
		placeholder = t('Enter text'),
		type = InputType.TEXT,
		theme = InputTheme.MAIN_INPUT,
		readonly,
		label,
		labelId,
		...otherProps
	} = props;
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const raw = e.target.value;
		const val = type === InputType.NUMBER ? Number(raw) || 0 : raw;
		onChange?.(val);
	};
	const [isPassword, setIsPassword] = useState(false);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		if (type === InputType.PASSWORD) {
			setIsPassword(true);
		}
	}, [type]);

	const passwordVisibleHandler = () => {
		setIsVisible((prev) => !prev);
	};

	return (
		<div
			className={classNames(cls.Input, { [cls.readonly]: readonly }, [
				className,
				cls[theme],
			])}
		>
			{theme === InputTheme.SEARCH_INPUT && (
				<SvgIcon className={cls.Input__icon} children={<SearchIcon />} />
			)}
			{label && (
				<label className={cls.Input__label} htmlFor={labelId}>
					{label}
				</label>
			)}
			<input
				type={
					type === InputType.PASSWORD
						? isVisible === true
							? InputType.TEXT
							: InputType.PASSWORD
						: type
				}
				value={value}
				onChange={onChangeHandler}
				placeholder={placeholder}
				readOnly={readonly}
				id={labelId}
				{...otherProps}
			/>
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
