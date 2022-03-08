import { createAddress, TestTransactionEvent } from "forta-agent-tools";
import {
  buildFindingResultTellerAdded,
  createTellerAddedTx,
  createTellersAddedTx,
} from "./helpers";

import bondDepositoryTellerAddedAgent from "../src/bond-depository-teller-added";

describe("bond depository teller added", () => {
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
    handleTransaction = bondDepositoryTellerAddedAgent.handleTransaction;
  });

  it("returns 0 findings since there are no teller added events", async () => {
    const basicTxEvent = new TestTransactionEvent();

    const findings = await handleTransaction(basicTxEvent, mockConfig);

    expect(findings).toStrictEqual([]);
  });

  it("returns 1 finding since a new teller gets added", async () => {
    const txEvent = createTellerAddedTx(
      mockConfig.bondDepositoryContractAddress,
      tellers[0],
      senders[0],
      1,
      2,
      "0xHash"
    );

    const findings = await handleTransaction(txEvent, mockConfig);

    const expectedFinding = buildFindingResultTellerAdded(
      mockConfig.bondDepositoryContractAddress,
      tellers[0],
      senders[0],
      1,
      2,
      "0xHash"
    );

    expect(findings).toStrictEqual([expectedFinding]);
  });

  it("returns 2 findings since a two tellers get added in the same transaction", async () => {
    const txEvent = createTellersAddedTx(
      mockConfig.bondDepositoryContractAddress,
      [tellers[0], tellers[1]],
      senders[0],
      1,
      2,
      "0xHash"
    );

    const findings = await handleTransaction(txEvent, mockConfig);

    const expectedFindings = [
      buildFindingResultTellerAdded(
        mockConfig.bondDepositoryContractAddress,
        tellers[0],
        senders[0],
        1,
        2,
        "0xHash"
      ),
      buildFindingResultTellerAdded(
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
