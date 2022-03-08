import { ethers, Finding, FindingSeverity, FindingType } from "forta-agent";
import { TestTransactionEvent } from "forta-agent-tools";
import {
  BOND_DEPOSITORY_TELLER_ADDED_EVENT,
  BOND_DEPOSITORY_TELLER_REMOVED_EVENT,
} from "./constants";

export const createLog = (abi: string, address: string, data: any) => {
  const iface = new ethers.utils.Interface([abi]);
  const fragment = Object.values(iface.events)[0];

  return {
    ...iface.encodeEventLog(fragment, data),
    address: address,
  };
};

export const createTellerAddedTx = (
  bondDepositoryContractAddress: string,
  teller: string,
  sender: string,
  blockNumber: number,
  timestamp: number,
  txHash: string
) => {
  const txEvent = new TestTransactionEvent();
  const dataRaw = [teller];
  txEvent.receipt.logs.push(
    createLog(
      BOND_DEPOSITORY_TELLER_ADDED_EVENT,
      bondDepositoryContractAddress,
      dataRaw
    ) as any
  );
  txEvent.setFrom(sender);
  txEvent.setTo(bondDepositoryContractAddress);
  txEvent.setBlock(blockNumber);
  txEvent.setTimestamp(timestamp);
  txEvent.setHash(txHash);
  return txEvent;
};

export const createTellersAddedTx = (
  bondDepositoryContractAddress: string,
  tellers: string[],
  sender: string,
  blockNumber: number,
  timestamp: number,
  txHash: string
) => {
  const txEvent = new TestTransactionEvent();
  tellers.map((teller) => {
    txEvent.receipt.logs.push(
      createLog(
        BOND_DEPOSITORY_TELLER_ADDED_EVENT,
        bondDepositoryContractAddress,
        [teller]
      ) as any
    );
  });
  txEvent.setFrom(sender);
  txEvent.setTo(bondDepositoryContractAddress);
  txEvent.setBlock(blockNumber);
  txEvent.setTimestamp(timestamp);
  txEvent.setHash(txHash);
  return txEvent;
};

export const createTellerRemovedTx = (
  bondDepositoryContractAddress: string,
  teller: string,
  sender: string,
  blockNumber: number,
  timestamp: number,
  txHash: string
) => {
  const txEvent = new TestTransactionEvent();
  const dataRaw = [teller];
  txEvent.receipt.logs.push(
    createLog(
      BOND_DEPOSITORY_TELLER_REMOVED_EVENT,
      bondDepositoryContractAddress,
      dataRaw
    ) as any
  );
  txEvent.setFrom(sender);
  txEvent.setTo(bondDepositoryContractAddress);
  txEvent.setBlock(blockNumber);
  txEvent.setTimestamp(timestamp);
  txEvent.setHash(txHash);
  return txEvent;
};

export const createTellersRemovedTx = (
  bondDepositoryContractAddress: string,
  tellers: string[],
  sender: string,
  blockNumber: number,
  timestamp: number,
  txHash: string
) => {
  const txEvent = new TestTransactionEvent();
  tellers.map((teller) => {
    txEvent.receipt.logs.push(
      createLog(
        BOND_DEPOSITORY_TELLER_REMOVED_EVENT,
        bondDepositoryContractAddress,
        [teller]
      ) as any
    );
  });
  txEvent.setFrom(sender);
  txEvent.setTo(bondDepositoryContractAddress);
  txEvent.setBlock(blockNumber);
  txEvent.setTimestamp(timestamp);
  txEvent.setHash(txHash);
  return txEvent;
};

export const buildFindingResultTellerAdded = (
  bondDepositoryContractAddress: string,
  tellerAddress: string,
  sender: string,
  blockNumber: number,
  timestamp: number,
  txHash: string
) => {
  return Finding.fromObject({
    name: "Solace BondDepository Monitoring",
    description: `BondDepository at ${bondDepositoryContractAddress}: Teller Added with address ${tellerAddress}`,
    alertId: "SOLACE-1",
    protocol: "ethereum",
    severity: FindingSeverity.Info,
    type: FindingType.Info,
    metadata: {
      txHash: txHash,
      sender,
      timestamp: timestamp.toString(),
      blockNumber: blockNumber.toString(),
    },
  });
};

export const buildFindingResultTellerRemoved = (
  bondDepositoryContractAddress: string,
  tellerAddress: string,
  sender: string,
  blockNumber: number,
  timestamp: number,
  txHash: string
) => {
  return Finding.fromObject({
    name: "Solace BondDepository Monitoring",
    description: `BondDepository at ${bondDepositoryContractAddress}: Teller Removed with address ${tellerAddress}`,
    alertId: "SOLACE-2",
    protocol: "ethereum",
    severity: FindingSeverity.Info,
    type: FindingType.Info,
    metadata: {
      txHash: txHash,
      sender,
      timestamp: timestamp.toString(),
      blockNumber: blockNumber.toString(),
    },
  });
};
