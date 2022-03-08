import {
  Finding,
  FindingSeverity,
  FindingType,
  TransactionEvent,
} from "forta-agent";
import { BOND_DEPOSITORY_TELLER_REMOVED_EVENT } from "./constants";

async function handleTransaction(
  txEvent: TransactionEvent,
  config: {
    bondDepositoryContractAddress: string;
  }
) {
  const findings: Finding[] = [];

  // if no events found for teller removals, return
  const tellerRemovedEvents = txEvent.filterLog(
    BOND_DEPOSITORY_TELLER_REMOVED_EVENT,
    config.bondDepositoryContractAddress
  );
  if (!tellerRemovedEvents.length) return findings;

  for (const tellerRemoved of tellerRemovedEvents) {
    findings.push(
      Finding.fromObject({
        name: "Solace BondDepository Monitoring",
        description: `BondDepository at ${config.bondDepositoryContractAddress}: Teller Removed with address ${tellerRemoved.args.teller}`,
        alertId: "SOLACE-2",
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
