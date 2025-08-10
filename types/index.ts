export interface TripOverview {
  destination: string;
  duration: string;
  budget: string;
}
export interface DailyPlan {
  day: string;
  title: string;
  activities: string[];
}

export interface BudgetBreakDown {
  totalBudget: string;
  travel: string;
  accommodation: string;
  food: string;
  activitiesAndTransport: string;
  note: string;
}
export interface LocalTips {
  currency: string;
  transport: string;
  shopping: string;
  dressCode: string;
  bestTimeToVisit: string;
  safety: string[];
}
export interface Summary {
  highlights: string[];
  recommendation: string;
  extras: string[];
}
export interface TripTypes {
  _id: string;
  tripTitle?: string;
  tripDescription?: string;
  currentLocation: string;
  tripLocation: string;
  budget: number;
  startDate: Date;
  endDate: Date;
  tripType: "family" | "solo" | "friends";
  numberOfPeople: number;
  visibility?: boolean;
  destination: string;
  tripOverview?: TripOverview[];
  dailyPlan?: DailyPlan[];
  budgetBreakdown?: BudgetBreakDown[];
  localTips?: LocalTips[];
  summary?: Summary[];
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
