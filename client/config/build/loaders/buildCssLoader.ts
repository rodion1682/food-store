import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';

const projectRoot = path.resolve(__dirname, '..', '..');

export function buildCssLoader(isDev: boolean) {
	return {
		test: /\.s[ac]ss$/i,
		use: [
			isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
			{
				loader: 'css-loader',
				options: {
					modules: {
						auto: (resPath: string) => resPath.includes('.module.'),
						localIdentName: isDev
							? '[path][name]__[local]'
							: '[hash:base64:8]',
					},
				},
			},
			{
				loader: 'sass-loader',
				options: {
					sassOptions: {
						includePaths: [path.resolve(projectRoot, 'src')],
					},
					additionalData: (
						content: string,
						ctx: { resourcePath: string }
					) => {
						if (ctx.resourcePath.includes('.module.')) {
							return `@use "app/styles/base/mixins" as *;\n${content}`;
						}
						return content;
					},
				},
			},
		],
	};
}
