import {
  Invested as InvestedEvent,
  TokensClaimed as TokensClaimedEvent,
} from '../generated/TokenDistribution/TokenDistribution'
import { Invested, TokensClaimed } from '../generated/schema'

export function handleInvested(event: InvestedEvent): void {
  let entity = new Invested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.investor = event.params.investor
  entity.period = event.params.period
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokensClaimed(event: TokensClaimedEvent): void {
  let entity = new TokensClaimed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.investor = event.params.investor
  entity.period = event.params.period
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
