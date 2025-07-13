import { ArrivalDepartureInfo } from '@/lib/api';

export default interface RouteStateInterface {
  departure: ArrivalDepartureInfo | null;
  arrival: ArrivalDepartureInfo | null;
}