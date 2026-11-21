export type USState = {
  code: string;
  name: string;
  multiplier: number;
  tax: number;
  cities: string[];
};

export const STATES: USState[] = [
  { code: "AL", name: "Alabama", multiplier: 0.95, tax: 9.2, cities: ["Birmingham", "Huntsville", "Montgomery", "Mobile", "Tuscaloosa"] },
  { code: "AK", name: "Alaska", multiplier: 1.1, tax: 1.8, cities: ["Anchorage", "Juneau", "Fairbanks", "Sitka", "Ketchikan"] },
  { code: "AZ", name: "Arizona", multiplier: 1.02, tax: 8.4, cities: ["Phoenix", "Tucson", "Mesa", "Chandler", "Scottsdale"] },
  { code: "AR", name: "Arkansas", multiplier: 0.92, tax: 9.5, cities: ["Little Rock", "Fayetteville", "Fort Smith", "Springdale", "Jonesboro"] },
  { code: "CA", name: "California", multiplier: 1.15, tax: 8.7, cities: ["Los Angeles", "San Francisco", "San Diego", "San Jose", "Fresno"] },
  { code: "CO", name: "Colorado", multiplier: 1.05, tax: 7.8, cities: ["Denver", "Colorado Springs", "Aurora", "Fort Collins", "Lakewood"] },
  { code: "CT", name: "Connecticut", multiplier: 1.08, tax: 6.4, cities: ["Bridgeport", "New Haven", "Stamford", "Hartford", "Waterbury"] },
  { code: "DE", name: "Delaware", multiplier: 1.0, tax: 0, cities: ["Wilmington", "Dover", "Newark", "Middletown", "Smyrna"] },
  { code: "FL", name: "Florida", multiplier: 1.03, tax: 7.0, cities: ["Miami", "Orlando", "Tampa", "Jacksonville", "St. Petersburg"] },
  { code: "GA", name: "Georgia", multiplier: 1.0, tax: 7.4, cities: ["Atlanta", "Savannah", "Augusta", "Columbus", "Athens"] },
  { code: "HI", name: "Hawaii", multiplier: 1.2, tax: 4.4, cities: ["Honolulu", "Hilo", "Kailua", "Pearl City", "Waipahu"] },
  { code: "ID", name: "Idaho", multiplier: 0.95, tax: 6.0, cities: ["Boise", "Meridian", "Nampa", "Idaho Falls", "Pocatello"] },
  { code: "IL", name: "Illinois", multiplier: 1.05, tax: 8.8, cities: ["Chicago", "Aurora", "Naperville", "Joliet", "Rockford"] },
  { code: "IN", name: "Indiana", multiplier: 0.98, tax: 7.0, cities: ["Indianapolis", "Fort Wayne", "Evansville", "South Bend", "Carmel"] },
  { code: "IA", name: "Iowa", multiplier: 0.95, tax: 6.9, cities: ["Des Moines", "Cedar Rapids", "Davenport", "Sioux City", "Iowa City"] },
  { code: "KS", name: "Kansas", multiplier: 0.95, tax: 8.7, cities: ["Wichita", "Overland Park", "Kansas City", "Olathe", "Topeka"] },
  { code: "KY", name: "Kentucky", multiplier: 0.95, tax: 6.0, cities: ["Louisville", "Lexington", "Bowling Green", "Owensboro", "Covington"] },
  { code: "LA", name: "Louisiana", multiplier: 0.96, tax: 9.5, cities: ["New Orleans", "Baton Rouge", "Shreveport", "Lafayette", "Lake Charles"] },
  { code: "ME", name: "Maine", multiplier: 0.98, tax: 5.5, cities: ["Portland", "Bangor", "Lewiston", "South Portland", "Auburn"] },
  { code: "MD", name: "Maryland", multiplier: 1.08, tax: 6.0, cities: ["Baltimore", "Rockville", "Frederick", "Gaithersburg", "Bowie"] },
  { code: "MA", name: "Massachusetts", multiplier: 1.12, tax: 6.3, cities: ["Boston", "Worcester", "Springfield", "Cambridge", "Lowell"] },
  { code: "MI", name: "Michigan", multiplier: 0.98, tax: 6.0, cities: ["Detroit", "Grand Rapids", "Warren", "Sterling Heights", "Ann Arbor"] },
  { code: "MN", name: "Minnesota", multiplier: 1.02, tax: 7.5, cities: ["Minneapolis", "St Paul", "Rochester", "Duluth", "Bloomington"] },
  { code: "MS", name: "Mississippi", multiplier: 0.9, tax: 7.1, cities: ["Jackson", "Gulfport", "Southaven", "Hattiesburg", "Biloxi"] },
  { code: "MO", name: "Missouri", multiplier: 0.97, tax: 8.2, cities: ["Kansas City", "St Louis", "Springfield", "Columbia", "Independence"] },
  { code: "MT", name: "Montana", multiplier: 0.95, tax: 0, cities: ["Billings", "Missoula", "Great Falls", "Bozeman", "Butte"] },
  { code: "NE", name: "Nebraska", multiplier: 0.95, tax: 6.9, cities: ["Omaha", "Lincoln", "Bellevue", "Grand Island", "Kearney"] },
  { code: "NV", name: "Nevada", multiplier: 1.05, tax: 8.2, cities: ["Las Vegas", "Reno", "Henderson", "North Las Vegas", "Sparks"] },
  { code: "NH", name: "New Hampshire", multiplier: 1.05, tax: 0, cities: ["Manchester", "Nashua", "Concord", "Derry", "Dover"] },
  { code: "NJ", name: "New Jersey", multiplier: 1.1, tax: 6.6, cities: ["Newark", "Jersey City", "Paterson", "Elizabeth", "Edison"] },
  { code: "NM", name: "New Mexico", multiplier: 0.95, tax: 7.8, cities: ["Albuquerque", "Santa Fe", "Las Cruces", "Rio Rancho", "Roswell"] },
  { code: "NY", name: "New York", multiplier: 1.2, tax: 8.5, cities: ["New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse"] },
  { code: "NC", name: "North Carolina", multiplier: 1.0, tax: 7.0, cities: ["Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem"] },
  { code: "ND", name: "North Dakota", multiplier: 0.95, tax: 6.9, cities: ["Fargo", "Bismarck", "Grand Forks", "Minot", "West Fargo"] },
  { code: "OH", name: "Ohio", multiplier: 0.98, tax: 7.2, cities: ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron"] },
  { code: "OK", name: "Oklahoma", multiplier: 0.94, tax: 9.0, cities: ["Oklahoma City", "Tulsa", "Norman", "Broken Arrow", "Lawton"] },
  { code: "OR", name: "Oregon", multiplier: 1.03, tax: 0, cities: ["Portland", "Salem", "Eugene", "Gresham", "Hillsboro"] },
  { code: "PA", name: "Pennsylvania", multiplier: 1.0, tax: 6.3, cities: ["Philadelphia", "Pittsburgh", "Allentown", "Erie", "Reading"] },
  { code: "RI", name: "Rhode Island", multiplier: 1.05, tax: 7.0, cities: ["Providence", "Warwick", "Cranston", "Pawtucket", "Woonsocket"] },
  { code: "SC", name: "South Carolina", multiplier: 0.96, tax: 7.4, cities: ["Charleston", "Columbia", "North Charleston", "Greenville", "Rock Hill"] },
  { code: "SD", name: "South Dakota", multiplier: 0.94, tax: 6.5, cities: ["Sioux Falls", "Rapid City", "Aberdeen", "Brookings", "Watertown"] },
  { code: "TN", name: "Tennessee", multiplier: 0.98, tax: 9.6, cities: ["Nashville", "Memphis", "Knoxville", "Chattanooga", "Clarksville"] },
  { code: "TX", name: "Texas", multiplier: 1.0, tax: 8.2, cities: ["Houston", "San Antonio", "Dallas", "Austin", "Fort Worth"] },
  { code: "UT", name: "Utah", multiplier: 1.0, tax: 6.8, cities: ["Salt Lake City", "Provo", "West Valley City", "West Jordan", "Orem"] },
  { code: "VT", name: "Vermont", multiplier: 0.98, tax: 6.3, cities: ["Burlington", "Essex", "South Burlington", "Rutland", "Montpelier"] },
  { code: "VA", name: "Virginia", multiplier: 1.03, tax: 5.8, cities: ["Virginia Beach", "Richmond", "Norfolk", "Chesapeake", "Arlington"] },
  { code: "WA", name: "Washington", multiplier: 1.08, tax: 9.4, cities: ["Seattle", "Spokane", "Tacoma", "Vancouver", "Bellevue"] },
  { code: "WV", name: "West Virginia", multiplier: 0.92, tax: 6.6, cities: ["Charleston", "Huntington", "Morgantown", "Parkersburg", "Wheeling"] },
  { code: "WI", name: "Wisconsin", multiplier: 0.98, tax: 5.4, cities: ["Milwaukee", "Madison", "Green Bay", "Kenosha", "Racine"] },
  { code: "WY", name: "Wyoming", multiplier: 0.95, tax: 5.4, cities: ["Cheyenne", "Casper", "Laramie", "Gillette", "Rock Springs"] },
];

// Helpers used by app/page.tsx and other pages.
export function getState(code: string): USState | undefined {
  return STATES.find((s) => s.code.toUpperCase() === code.toUpperCase());
}

export function getStateMultiplier(code: string): number {
  return getState(code)?.multiplier ?? 1.0;
}

export function getStateTax(code: string): number {
  return getState(code)?.tax ?? 0;
}
