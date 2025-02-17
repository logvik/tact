import normalize from "path-normalize";

export function parseImportPath(src: string) {
    if (!src.startsWith('./')) {
        return null;
    }
    if (src.endsWith('/')) {
        return null;
    }
    return normalize(src.slice(2)).split('/');
}