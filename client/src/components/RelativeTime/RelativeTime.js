import { formatDistanceToNow } from 'date-fns';
import {vi} from 'date-fns/locale';

const RelativeTime = ({ date }) => {
  const formattedTime = formatDistanceToNow(new Date(date), { addSuffix: true, locale: vi });

  return <span>{formattedTime}</span>;
};

export default RelativeTime;