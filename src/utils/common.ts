export const classNames = (...names: (string | undefined | null)[]): string =>
	(names || []).filter((e) => !!e && typeof e === 'string').join(' ')

export function getURL(url: string) {
	if (!url.includes('http://') && !url.includes('https://') ) {
		url = "https://" + url;
	}

	return url
}