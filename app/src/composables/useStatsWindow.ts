import moment from 'moment';
import StatsWindow from 'src/types/StatsWindow.type';

export default function useStatsWindow(window: StatsWindow, to: moment.Moment) {
  switch (window) {
    case StatsWindow['3h']:
      return to.clone().subtract(3, 'hours');
    case StatsWindow['6h']:
      return to.clone().subtract(6, 'hours');
    case StatsWindow['12h']:
      return to.clone().subtract(12, 'hours');
    case StatsWindow['1d']:
      return to.clone().subtract(1, 'days');
    case StatsWindow['1w']:
      return to.clone().subtract(1, 'weeks');
    default:
      return to.clone().subtract(1, 'days');
  }
}
