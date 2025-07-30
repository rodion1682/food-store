import { CSSProperties, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './Avatar.module.scss';

interface AvatarProps {
	className?: string;
	src?: string;
	height?: string | number;
	width?: string | number;
	border?: string | number;
}

export const Avatar = memo((props: AvatarProps) => {
	const { t } = useTranslation();
	const { className, src, height = 50, width = 50, border = '50%' } = props;

	const styles: CSSProperties = {
		height,
		width,
		minWidth: width,
		borderRadius: border,
	};

	return (
		<div
			className={classNames(cls.Avatar, {}, [className, '_ibg'])}
			style={styles}
		>
			<img
				src={src}
				alt={t('Unfortunately, the image could not be loaded')}
			/>
		</div>
	);
});
