import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './Select.module.scss';
import { memo, useCallback, useMemo, useRef, useState } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { useClickOutside } from 'shared/lib/hooks/useClickOutside/useClickOutside';
import { slideToggle, slideUp } from 'shared/lib/hooks/slideToggle/slideToggle';

interface SelectProps {
	className?: string;
	options?: string[];
	placeholder?: string;
	selectedOption?: string;
	onChange?: (value?: string) => void;
	readonly?: boolean;
}

export const Select = memo((props: SelectProps) => {
	const { t } = useTranslation();
	const {
		className,
		options,
		selectedOption,
		onChange,
		readonly,
		placeholder = t('Sort by'),
	} = props;

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const dropdownList = useRef<HTMLDivElement>(null);

	const filterdOptions = useMemo(() => {
		if (!options) return null;

		return options
			.filter((item) => item !== selectedOption)
			.map((item) => (
				<Button
					key={item}
					className={cls.Select__item}
					onClick={() => onChange?.(item)}
					theme={ButtonTheme.SELECT}
				>
					{item}
				</Button>
			));
	}, [options, selectedOption, onChange]);

	const toggleDropdown = useCallback(() => {
		slideToggle(dropdownList.current!);
		setIsOpen((prev) => !prev);
	}, []);
	const onCloseDrowdown = useCallback(() => {
		slideUp(dropdownList.current!);
		setIsOpen(false);
	}, []);

	useClickOutside({
		target: dropdownRef.current!,
		isOpen: isOpen,
		onClose: onCloseDrowdown,
	});

	const mods: Mods = {
		[cls.Select_disabled]: readonly,
	};

	return (
		<div
			ref={dropdownRef}
			className={classNames(cls.Select, mods, [className])}
		>
			<span className={cls.Select__placeholder}>{placeholder}</span>
			<Button
				className={cls.Select__label}
				onClick={toggleDropdown}
				open={isOpen}
				theme={ButtonTheme.DROPDOWN}
			>
				{selectedOption}
			</Button>
			<div ref={dropdownList} hidden className={cls.Select__dropdown}>
				{filterdOptions}
			</div>
		</div>
	);
});
