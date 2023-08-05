import moment from 'moment-timezone';

const losAngelesTimezone = 'America/Los_Angeles';

export function convertToLosAngeles(utcString: string | null, isInfo = false) {
  if (!utcString) {
    return "Anytime"
  }
  // Create a moment object from the UTC timestamp string in UTC timezone
  const utcMoment = moment.utc(utcString);

  // Convert the moment object to the Los Angeles timezone
  const losAngelesMoment = utcMoment.tz(losAngelesTimezone);

  // let formatType = 'MM/DD/YYYY HH:mm'
  if (isInfo) {
    return losAngelesMoment.format('llll');
  }

  // Format the Los Angeles moment object as a date string in the "MM/DD/YYYY HH:mm" format
  // Return the Los Angeles string
  return losAngelesMoment.format('MM/DD/YYYY HH:mm');
}