export function formatCityName(cityName: string) {
  if (!cityName) return '';

  return cityName
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}