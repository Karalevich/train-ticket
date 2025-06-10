export default interface TicketStateInterface {
  departureCity: CityInterface,
  returnCity: CityInterface,
  date: {
    from: string
    to: string
  };
  loading: boolean;
  error: string | null;
}

export interface CityInterface {
  _id: string,
  name: string
}