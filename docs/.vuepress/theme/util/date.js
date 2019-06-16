import LocalizedFormat from './relativeTime';
import dayjs from 'dayjs';

dayjs.extend(LocalizedFormat);

export const date = dayjs
export function relativeTime(t) {
  return dayjs().from(t);
}
