import fetchURL from "../../utils/fetchURL";
import { SimpleAdapter } from "../../adapters/types";
import { CHAIN } from "../../helpers/chains";
import { getUniqStartOfTodayTimestamp } from "../../helpers/getUniSubgraphVolume";

const feeEndpoint = "https://api.scopuly.com/api/liquidity_pools_fees"

interface IChartItem {
  time: string
  fees: number
}

const fetch = async (timestamp: number) => {
  const dayTimestamp = getUniqStartOfTodayTimestamp(new Date(timestamp * 1000))
  const historicalFees: IVolumeall[] = (await fetchURL(feeEndpoint));
  const totalFee = historicalVolume
    .filter(volItem => getUniqStartOfTodayTimestamp(new Date(Number(volItem.time))) <= dayTimestamp)
    .reduce((acc, { fees }) => acc + Number(fees), 0)

  const dailyVolume = historicalVolume
    .find(dayItem => getUniqStartOfTodayTimestamp(new Date(Number(dayItem.time))) === dayTimestamp)?.fees

  return {
    timestamp: dayTimestamp,
    totalFees: `${totalFee}`,
    dailyFees: dailyFee ? `${dailyFee}` : undefined,
    totalRevenue: "0",
    dailyRevenue: "0",
  };
};

const getStartTimestamp = async () => {
  const historicalVolume: IVolumeall[] = (await fetchURL(feeEndpoint));
  return getUniqStartOfTodayTimestamp(new Date(historicalVolume[0].time))
}

const adapter: FeeAdapter = {
  fees: {
    stellar: {
      fetch,
      runAtCurrTime: true,
      start: getStartTimestamp,
    },
  }
}

export default adapter;
