import { memo, useRef } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import cls from './ImageInput.module.scss';
import { Text, TextAlign } from 'shared/ui/Text';
import { useTranslation } from 'react-i18next';

interface ImageInputProps {
	className?: string;
	placeholder?: string;
	name: string;
	previewImage?: string | null;
	setPreviewImage?: (value: string | null) => void;
	onChange?: (value: File) => void;
	readonly?: boolean;
}
export const ImageInput = memo((props: ImageInputProps) => {
	const {
		className,
		placeholder,
		name,
		readonly,
		previewImage,
		setPreviewImage,
		onChange,
	} = props;
	const { t } = useTranslation();

	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (previewImage && previewImage.startsWith('blob:')) {
			URL.revokeObjectURL(previewImage);
		}

		const previewUrl = URL.createObjectURL(file);
		setPreviewImage?.(previewUrl);

		onChange?.(file);
	};

	const mods: Mods = { [cls.ImageInput_readonly]: readonly };

	return (
		<div className={classNames(cls.ImageInput, mods, [className])}>
			<input
				type="file"
				accept={'image/*'}
				id={name}
				name={name}
				onChange={handleImageChange}
				ref={fileInputRef}
				className={cls.ImageInput__input}
			/>
			<label htmlFor={name} className={cls.ImageInput__uploadText}>
				{previewImage ? (
					<div
						className={classNames(cls.ImageInput__imagePreview, {}, [
							'_ibg',
						])}
					>
						<img src={previewImage} alt="Preview" />
						{!readonly && (
							<Text
								title={t('Change Image')}
								align={TextAlign.CENTER}
								className={cls.ImageInput__imageChange}
							/>
						)}
					</div>
				) : (
					<div className={cls.ImageInput__uploadPlaceholder}>
						<Text
							title={placeholder}
							align={TextAlign.CENTER}
							className={cls.ImageInput__imageSelect}
						/>
					</div>
				)}
			</label>
		</div>
	);
});
