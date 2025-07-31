import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ProfileLink.module.scss';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { AppLink, AppLinkTheme } from '../AppLink';
import { Avatar } from 'shared/ui/Avatar';
import { Text } from 'shared/ui/Text';

interface ProfileLinkProps {
	className?: string;
	id: string | number;
	username: string;
	src: string;
	height?: string | number;
	width?: string | number;
	active?: boolean;
	theme?: AppLinkTheme;
	limitWidth?: boolean;
}

export const ProfileLink = memo((props: ProfileLinkProps) => {
	const {
		className,
		id,
		username,
		src,
		height,
		width,
		active,
		theme,
		limitWidth,
	} = props;

	return (
		<AppLink
			className={classNames(
				cls.ProfileLink,
				{ [cls.ProfileLink_limitWidth]: limitWidth },
				[className]
			)}
			to={`${RoutePath.profile}${id}`}
			active={active}
			theme={theme}
		>
			<Avatar
				className={cls.ProfileLink__avatar}
				src={src}
				width={width}
				height={height}
			/>
			<Text className={cls.ProfileLink__username} title={username} />
		</AppLink>
	);
});
