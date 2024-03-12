export interface DashSalesModel {
  total_value: number;
  approved_value: number;
  average_ticket: number;
  graph: Graph[];
}

export interface Graph {
  date: string;
  value: number;
}

//Sales By Method Model
export interface SalesByMethodModel {
  data: SalesByMethod[];
}

export interface SalesByMethod {
  id: number;
  name: string;
  value: number;
  icon_url: string;
  percentage: number;
}

//Dash Card Usage Details Model
export interface DashCardUsageDetailsModel {
  data: DashCardUsageDetails[];
}

export interface DashCardUsageDetails {
  number_of_installments: number;
  total_transactions: number;
  percentage: number;
}

//Dash Rates Model
export interface DashRatesModel {
  data: DashRates[]
}

export interface DashRates {
  name: string
  percentage: number
}

//Dash Tracking Model
export interface DashTrackingModel {
  data: DashTracking[]
}

export interface DashTracking {
  status: string
  total?: number
  percentage: number
  value?: number
}


