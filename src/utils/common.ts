export const classNames = (...names: (string | undefined | null)[]): string =>
	(names || []).filter((e) => !!e && typeof e === 'string').join(' ')
