export const encodeUrlComponent = (url: string): string => {
    return encodeURIComponent(url).replaceAll('%20', '+');
}

export const decodeUrlComponent = (url: string): string => {
    return decodeURIComponent(url.replaceAll('+', '%20'));
}