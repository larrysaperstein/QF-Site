/**
 * Gallery thumb paths follow the convention:
 * /images/shows/foo/bar1.webp -> /images/shows/foo/bar1-thumb.webp
 */
export function getGalleryThumbSrc(src: string): string {
  return src.replace(/(\.[^./]+)$/, '-thumb$1');
}
