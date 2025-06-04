export default interface TicketStateInterface {
  direction: {
    from: string;
    to: string;
  };
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