import {
  Invested as InvestedEvent,
  TokensClaimed as TokensClaimedEvent,
} from '../generated/TokenDistribution/TokenDistribution'
import { Invested, TokensClaimed, PeriodSummary } from '../generated/schema'
import { Bytes, BigInt } from '@graphprotocol/graph-ts'

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

  let periodSummary = PeriodSummary.load(
    Bytes.fromI32(event.params.period.toI32())
  )
  if (periodSummary == null) {
    periodSummary = new PeriodSummary(
      Bytes.fromI32(event.params.period.toI32())
    )
    periodSummary.totalInvested = BigInt.fromI32(0)
    periodSummary.totalClaimed = BigInt.fromI32(0)
  }

  periodSummary.totalInvested = periodSummary.totalInvested.plus(
    event.params.amount
  )
  periodSummary.save()
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

  let periodSummary = PeriodSummary.load(
    Bytes.fromI32(event.params.period.toI32())
  )
  if (periodSummary == null) {
    periodSummary = new PeriodSummary(
      Bytes.fromI32(event.params.period.toI32())
    )
    periodSummary.totalInvested = BigInt.fromI32(0)
    periodSummary.totalClaimed = BigInt.fromI32(0)
  }

  periodSummary.totalClaimed = periodSummary.totalClaimed.plus(
    event.params.amount
  )
  periodSummary.save()
}
