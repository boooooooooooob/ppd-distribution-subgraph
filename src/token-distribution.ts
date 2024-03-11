import {
  Initialized as InitializedEvent,
  Invested as InvestedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  TokensClaimed as TokensClaimedEvent,
  Upgraded as UpgradedEvent
} from "../generated/TokenDistribution/TokenDistribution"
import {
  Initialized,
  Invested,
  OwnershipTransferred,
  TokensClaimed,
  Upgraded
} from "../generated/schema"

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

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

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

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

export function handleUpgraded(event: UpgradedEvent): void {
  let entity = new Upgraded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.implementation = event.params.implementation

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
