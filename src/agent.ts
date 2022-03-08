import { Finding, HandleTransaction, TransactionEvent } from "forta-agent";
import { SOLACE_BOND_DEPOSITORY_CONTRACT_ADDRESS } from "./config";

import bondDepositoryTellerAdded from "./bond-depository-teller-added";
import bondDepositoryTellerRemoved from "./bond-depository-teller-removed";

export type Config = {
  bondDepositoryContractAddress: string;
};

export type BondDepositoryTellerAddedHandleTransactionFunctionType = (
  txEvent: TransactionEvent,
  config: Config
) => Promise<Finding[]>;

export type BondDepositoryTellerRemovedHandleTransactionFunctionType = (
  txEvent: TransactionEvent,
  config: Config
) => Promise<Finding[]>;

function provideHandleTransaction(
  bondDepositoryTellerAddedHandleTransaction: BondDepositoryTellerAddedHandleTransactionFunctionType,
  bondDepositoryTellerRemovedHandleTransaction: BondDepositoryTellerRemovedHandleTransactionFunctionType,
  config: Config
): HandleTransaction {
  return async function handleTransaction(txEvent: TransactionEvent) {
    const findingsTellerAdded =
      await bondDepositoryTellerAddedHandleTransaction(txEvent, config);

    const findingsTellerRemoved =
      await bondDepositoryTellerRemovedHandleTransaction(txEvent, config);

    return [findingsTellerAdded, findingsTellerRemoved].flat();
  };
}

export default {
  provideHandleTransaction,
  handleTransaction: provideHandleTransaction(
    bondDepositoryTellerAdded.handleTransaction,
    bondDepositoryTellerRemoved.handleTransaction,
    {
      bondDepositoryContractAddress:
        SOLACE_BOND_DEPOSITORY_CONTRACT_ADDRESS,
    }
  ),
};
