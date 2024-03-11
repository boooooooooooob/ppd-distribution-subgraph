import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  Initialized,
  Invested,
  OwnershipTransferred,
  TokensClaimed,
  Upgraded
} from "../generated/TokenDistribution/TokenDistribution"

export function createInitializedEvent(version: BigInt): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(version)
    )
  )

  return initializedEvent
}

export function createInvestedEvent(
  investor: Address,
  period: BigInt,
  amount: BigInt
): Invested {
  let investedEvent = changetype<Invested>(newMockEvent())

  investedEvent.parameters = new Array()

  investedEvent.parameters.push(
    new ethereum.EventParam("investor", ethereum.Value.fromAddress(investor))
  )
  investedEvent.parameters.push(
    new ethereum.EventParam("period", ethereum.Value.fromUnsignedBigInt(period))
  )
  investedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return investedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createTokensClaimedEvent(
  investor: Address,
  period: BigInt,
  amount: BigInt
): TokensClaimed {
  let tokensClaimedEvent = changetype<TokensClaimed>(newMockEvent())

  tokensClaimedEvent.parameters = new Array()

  tokensClaimedEvent.parameters.push(
    new ethereum.EventParam("investor", ethereum.Value.fromAddress(investor))
  )
  tokensClaimedEvent.parameters.push(
    new ethereum.EventParam("period", ethereum.Value.fromUnsignedBigInt(period))
  )
  tokensClaimedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return tokensClaimedEvent
}

export function createUpgradedEvent(implementation: Address): Upgraded {
  let upgradedEvent = changetype<Upgraded>(newMockEvent())

  upgradedEvent.parameters = new Array()

  upgradedEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  )

  return upgradedEvent
}
