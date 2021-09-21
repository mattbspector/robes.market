import { NextApiRequest, NextApiResponse } from 'next'
import pMap from 'p-map'
import { chunk, flatten, orderBy } from 'lodash'
import { utils as etherUtils, BigNumber } from 'ethers'
import { rarityImage } from 'loot-rarity'
import type { OpenseaResponse, Asset } from '../../../utils/openseaTypes'
import Data_Map from '../../../data';
import ALL_DATA from '../../../data/data.json';

const apiKey = process.env.OPENSEA_API_KEY

const fetchNPage = async (ids: string[]) => {
  let url = 'https://api.opensea.io/api/v1/assets?collection=adventure-cards&'
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
  // const rareArrArray = []; 
  // const traitObj = ALL_DATA.reduce((newArr, ddd) => {
  //   const keyt = Object.keys(ddd)[0];
  //   const traitList = ddd[keyt];
  //   traitList.map((tl) => {
  //     if (newArr[tl]) {
  //       newArr[tl] = newArr[tl] + 1;
  //     } else {
  //       newArr[tl] = 1;
  //     }
  //   })
  //   return newArr;
  // }, {})

  // const rareTraits = Object.keys(traitObj).reduce((newArr, to) => {
  //   if (traitObj[to] === 1) {
  //     newArr.push(to);
  //   } 

  //   return newArr;
  // }, []);

  // const rareList = ALL_DATA.reduce((newArr, ddd) => {
  //   const keyt = Object.keys(ddd)[0];
  //   const traitList = ddd[keyt];
  //   let hasDragon = 0;
  //   let hasWizard = false;
  //   let hasPhoenix = false;
  //   let hasDemon = false;
  //   let hasRobe = false;

  //   traitList.map((tl) => {
  //     if (tl.includes('Dragon')) {
  //       hasDragon = hasDragon + 1;
  //     }
  //     // if (tl.includes('Wizard')) {
  //     //   hasWizard = true;
  //     // }
  //     // if (tl.includes('Phoenix')) {
  //     //   hasPhoenix = true;
  //     // }
  //     // if (tl.includes('Demon')) {
  //     //   hasDemon = true;
  //     // }
  //     // if (tl.includes('Divine Robe')) {
  //     //   hasRobe = true;
  //     // }
  //   })

  //   if (hasDragon >= 4) {
  //     newArr.push(keyt)
  //   }

  //   return newArr;
  // }, [])

  // console.log(rareList);

  const dataToUse = Data_Map[setName] || [];
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
