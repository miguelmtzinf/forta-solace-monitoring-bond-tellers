import { createAddress, TestTransactionEvent } from "forta-agent-tools";
import {
  buildFindingResultTellerRemoved,
  createTellerRemovedTx,
  createTellersRemovedTx,
} from "./helpers";

import bondDepositoryTellerRemovedAgent from "./bond-depository-teller-removed";

describe("bond depository teller removed", () => {
  let handleTransaction: any;

  const mockConfig = {
    bondDepositoryContractAddress: createAddress("0x1"),
  };

  const tellers = [
    createAddress("0x10001"),
    createAddress("0x10002"),
    createAddress("0x10003"),
    createAddress("0x10004"),
  ];
  const senders = [
    createAddress("0x20001"),
    createAddress("0x20002"),
    createAddress("0x20003"),
    createAddress("0x20004"),
  ];

  beforeAll(() => {
    handleTransaction = bondDepositoryTellerRemovedAgent.handleTransaction;
  });

  it("returns 0 findings since there are no teller removed events", async () => {
    const basicTxEvent = new TestTransactionEvent();

    const findings = await handleTransaction(basicTxEvent, mockConfig);

    expect(findings).toStrictEqual([]);
  });

  it("returns 1 finding since a new teller gets removed", async () => {
    const txEvent = createTellerRemovedTx(
      mockConfig.bondDepositoryContractAddress,
      tellers[0],
      senders[0],
      1,
      2,
      "0xHash"
    );

    const findings = await handleTransaction(txEvent, mockConfig);

    const expectedFinding = buildFindingResultTellerRemoved(
      mockConfig.bondDepositoryContractAddress,
      tellers[0],
      senders[0],
      1,
      2,
      "0xHash"
    );

    expect(findings).toStrictEqual([expectedFinding]);
  });

  it("returns 2 findings since a two tellers get removed in the same transaction", async () => {
    const txEvent = createTellersRemovedTx(
      mockConfig.bondDepositoryContractAddress,
      [tellers[0], tellers[1]],
      senders[0],
      1,
      2,
      "0xHash"
    );

    const findings = await handleTransaction(txEvent, mockConfig);

    const expectedFindings = [
      buildFindingResultTellerRemoved(
        mockConfig.bondDepositoryContractAddress,
        tellers[0],
        senders[0],
        1,
        2,
        "0xHash"
      ),
      buildFindingResultTellerRemoved(
        mockConfig.bondDepositoryContractAddress,
        tellers[1],
        senders[0],
        1,
        2,
        "0xHash"
      ),
    ];

    expect(findings).toStrictEqual(expectedFindings);
  });
});
