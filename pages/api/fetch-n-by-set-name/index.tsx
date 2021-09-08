import { NextApiRequest, NextApiResponse } from 'next'
import pMap from 'p-map'
import { chunk, flatten, orderBy } from 'lodash'
import { utils as etherUtils, BigNumber } from 'ethers'
import { rarityImage } from 'loot-rarity'
import type { OpenseaResponse, Asset } from '../../../utils/openseaTypes'
import Data_Map from '../../../data';

const apiKey = process.env.OPENSEA_API_KEY

const fetchNPage = async (ids: string[]) => {
  let url = 'https://api.opensea.io/api/v1/assets?collection=n-project&'
  url += ids.map((id) => `token_ids=${id}`).join('&')

  const res = await fetch(url);
  const json: OpenseaResponse = await res.json()
  return json.assets
}

export interface RobeInfo {
  id: string
  price: Number
  url: string
  svg: string
}

export const fetchNs= async (setName: string = 'zero') => {  
  const dataToUse = Data_Map[setName] || [];
  console.log(dataToUse);
  const chunked = chunk(dataToUse, 20)

  const data = await pMap(chunked, fetchNPage, { concurrency: 2 })
  var filtered = flatten(data)
    .filter(
      (a: Asset) =>
        a?.sell_orders?.[0]?.payment_token_contract.symbol === 'ETH',
    )

  // No buy now listings found, filter by WETH to include auctions
  if (filtered.length == 0){
    filtered = flatten(data)
    .filter(
      (a: Asset) =>
        a?.sell_orders?.[0]?.payment_token_contract.symbol === 'WETH',
    )

  }

  const mapped = filtered.map((a: Asset): RobeInfo => {
      return {
        id: a.token_id,
        price: Number(
          etherUtils.formatUnits(
            BigNumber.from(a.sell_orders[0]?.current_price.split('.')[0]),
          ),
        ),
        url: a.permalink + '',
        svg: a.image_url,
      }
    })

  return {
    robes: orderBy(mapped, ['price', 'id'], ['asc', 'asc']),
    lastUpdate: new Date().toISOString(),
  }
}

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await fetchNs('')
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
