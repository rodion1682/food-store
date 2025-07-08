import { BuildOptions } from '../types/config';

export function buildBabelLoader({ isDev }: BuildOptions) {
	return {
		test: /\.(js|jsx|tsx)$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: [
					['@babel/preset-env', { targets: 'defaults' }],
					[
						'@babel/preset-react',
						{ runtime: 'automatic', development: isDev },
					],
				],
				plugins: [isDev && require.resolve('react-refresh/babel')].filter(
					Boolean
				),
			},
		},
	};
}
