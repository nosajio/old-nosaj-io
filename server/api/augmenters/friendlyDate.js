const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

module.exports = friendlyDate;

function friendlyDate(item) {
  const augmentedItem = Object.assign({}, item);
  const itemDate = new Date(item.date);
  const dayMs = 60 * 60 * 24 * 1000;
  const todayMs = new Date().getTime();
  const dateMs = itemDate.getTime();
  const deltaMs = todayMs - dateMs;
  const daysSinceDate = Math.round(deltaMs/dayMs)-1;
  if (daysSinceDate < 1) {
    augmentedItem.friendlyDate = 'Today';
  } else if (daysSinceDate === 2) {
    augmentedItem.friendlyDate = 'Yesterday';
  } else {
    augmentedItem.friendlyDate = `${itemDate.getDate()} ${months[itemDate.getMonth()]} ${itemDate.getFullYear()}`;
  }
  return augmentedItem;
}
