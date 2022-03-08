import agent from "./agent";

describe("Solace BondDepository Monitoring Agent", () => {
  let handleTransaction: any;

  const mockBondDepositoryTellerAdded = {
    handleTransaction: jest.fn(),
  };
  const mockBondDepositoryTellerRemoved = {
    handleTransaction: jest.fn(),
  };
  const mockTxEvent = {
    some: "event",
  };

  const mockConfig = {
    bondDepositoryContractAddress: "0x",
  };

  beforeAll(() => {
    handleTransaction = agent.provideHandleTransaction(
      mockBondDepositoryTellerAdded.handleTransaction,
      mockBondDepositoryTellerRemoved.handleTransaction,
      mockConfig
    );
  });

  it("calls bondDepositoryTellerAdded and bondDepositoryTellerRemoved and returns its findings", async () => {
    const mockFinding1 = { some: "finding1" };
    const mockFinding2 = { some: "finding2" };
    mockBondDepositoryTellerAdded.handleTransaction.mockReturnValueOnce([
      mockFinding1,
    ]);
    mockBondDepositoryTellerRemoved.handleTransaction.mockReturnValueOnce([
      mockFinding2,
    ]);

    const findings = await handleTransaction(mockTxEvent);

    expect(findings).toStrictEqual([mockFinding1, mockFinding2]);
    expect(
      mockBondDepositoryTellerAdded.handleTransaction
    ).toHaveBeenCalledTimes(1);
    expect(
      mockBondDepositoryTellerAdded.handleTransaction
    ).toHaveBeenCalledWith(mockTxEvent, mockConfig);
    expect(
      mockBondDepositoryTellerRemoved.handleTransaction
    ).toHaveBeenCalledTimes(1);
    expect(
      mockBondDepositoryTellerRemoved.handleTransaction
    ).toHaveBeenCalledWith(mockTxEvent, mockConfig);
  });
});
