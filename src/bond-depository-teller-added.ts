import {
  Finding,
  FindingSeverity,
  FindingType,
  TransactionEvent,
} from "forta-agent";
import { BOND_DEPOSITORY_TELLER_ADDED_EVENT } from "./constants";

async function handleTransaction(
  txEvent: TransactionEvent,
  config: {
    bondDepositoryContractAddress: string;
  }
) {
  const findings: Finding[] = [];

  // if no events found for teller additions, return
  const tellerAddedEvents = txEvent.filterLog(
    BOND_DEPOSITORY_TELLER_ADDED_EVENT,
    config.bondDepositoryContractAddress
  );
  if (!tellerAddedEvents.length) return findings;

  for (const tellerAdded of tellerAddedEvents) {
    findings.push(
      Finding.fromObject({
        name: "Solace BondDepository Monitoring",
        description: `BondDepository at ${config.bondDepositoryContractAddress}: Teller Added with address ${tellerAdded.args.teller}`,
        alertId: "SOLACE-1",
        protocol: "ethereum",
        severity: FindingSeverity.Info,
        type: FindingType.Info,
        metadata: {
          txHash: txEvent.hash,
          sender: txEvent.from,
          timestamp: txEvent.timestamp.toString(),
          blockNumber: txEvent.blockNumber.toString(),
        },
      })
    );
  }

  return findings;
}

export default {
  handleTransaction,
};
