import {
  Invested as InvestedEvent,
  TokensClaimed as TokensClaimedEvent,
} from '../generated/TokenDistribution/TokenDistribution'
import {
  Invested,
  TokensClaimed,
  PeriodSummary,
  UniqueInvestor,
  GlobalSummary,
} from '../generated/schema'
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
    periodSummary.period = event.params.period
    periodSummary.totalInvested = BigInt.fromI32(0)
    periodSummary.totalClaimed = BigInt.fromI32(0)
    periodSummary.totalUniqueInvestors = BigInt.fromI32(0)
  }

  periodSummary.totalInvested = periodSummary.totalInvested.plus(
    event.params.amount
  )

  let investorId =
    event.params.investor.toHexString() + '-' + event.params.period.toString()
  let uniqueInvestor = UniqueInvestor.load(investorId)
  if (uniqueInvestor == null) {
    uniqueInvestor = new UniqueInvestor(investorId)
    uniqueInvestor.investor = event.params.investor
    uniqueInvestor.period = event.params.period

    uniqueInvestor.save()

    periodSummary.totalUniqueInvestors =
      periodSummary.totalUniqueInvestors.plus(BigInt.fromI32(1))
  }

  periodSummary.save()

  let globalSummary = GlobalSummary.load('1')
  if (globalSummary == null) {
    globalSummary = new GlobalSummary('1')
    globalSummary.totalInvested = BigInt.fromI32(0)
    globalSummary.totalClaimed = BigInt.fromI32(0)
    globalSummary.totalUniqueInvestors = BigInt.fromI32(0)
  }

  globalSummary.totalInvested = globalSummary.totalInvested.plus(
    event.params.amount
  )

  let globalInvestorId = event.params.investor.toHexString() + '-global'

  let globalUniqueInvestor = UniqueInvestor.load(globalInvestorId)
  if (globalUniqueInvestor == null) {
    globalUniqueInvestor = new UniqueInvestor(globalInvestorId)
    globalUniqueInvestor.investor = event.params.investor
    globalUniqueInvestor.period = BigInt.fromI32(-1)

    globalUniqueInvestor.save()

    globalSummary.totalUniqueInvestors =
      globalSummary.totalUniqueInvestors.plus(BigInt.fromI32(1))
  }

  globalSummary.save()
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
    periodSummary.period = event.params.period
    periodSummary.totalInvested = BigInt.fromI32(0)
    periodSummary.totalClaimed = BigInt.fromI32(0)
  }

  periodSummary.totalClaimed = periodSummary.totalClaimed.plus(
    event.params.amount
  )
  periodSummary.save()

  let globalSummary = GlobalSummary.load('1')
  if (globalSummary == null) {
    globalSummary = new GlobalSummary('1')
    globalSummary.totalInvested = BigInt.fromI32(0)
    globalSummary.totalClaimed = BigInt.fromI32(0)
    globalSummary.totalUniqueInvestors = BigInt.fromI32(0)
  }

  globalSummary.totalClaimed = globalSummary.totalClaimed.plus(
    event.params.amount
  )
  globalSummary.save()
}
