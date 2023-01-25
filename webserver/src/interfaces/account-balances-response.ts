import { ResponseStatus } from './response-status';
import Balance from './balance';

export default interface AccountBalancesResponseBody {
  status: ResponseStatus;
  data: {
    address: string;
    balances: Balance[];
    balancesLength: number;
  };
}
