# Forta Agent to monitor BondDepository contract of Solace protocol

## Description

This agent monitors the management of BondTeller contracts in the [BondDepository](https://docs.solace.fi/docs/dev-docs/Contracts/bonds/BondDepository) contract of Solace protocol. It raises alerts when BondTeller contracts are added or removed of the system.

The agent is configured for Solace protocol in Ethereum mainnet, but it is just a matter of configuration to make it work with other networks:
 - Updating the `SOLACE_BOND_DEPOSITORY_CONTRACT_ADDRESS` parameter [here](src/config.ts) would allow us to target a different BondDepository contract.
 - Updating the `jsonRpcUrl` property of the configuration _forta_ JSON file would allow us to connect to a different network.

## Supported Chains

- Ethereum
- Any other EVM-based network where Solace is deployed

## Alerts

Describe each of the type of alerts fired by this agent

- SOLACE-1

  - Fired when a BondTeller is added to the BondDepository contract,
  - Severity and type are always set to `info`.
  - Additional metadata fields related to the addition of the bond teller:
    - `txHash`: the hash of the transaction
    - `sender`: the sender of the transaction
    - `timestamp`: the timestamp of the transaction
    - `blockNumber`: the block number of the transaction

- SOLACE-2

  - Fired when a BondTeller is removed from the BondDepository contract,
  - Severity and type are always set to `info`.
  - Additional metadata fields related to the removal of the bond teller:
    - `txHash`: the hash of the transaction
    - `sender`: the sender of the transaction
    - `timestamp`: the timestamp of the transaction
    - `blockNumber`: the block number of the transaction

## Alert Samples

- The address `0x0000000000000000000000000000000000010002` submitted a transaction to add a new BondTeller with address `0x0000000000000000000000000000000000000001` to the BondDepository at `0x0000000000000000000000000000000000020001`.

```JSON
{
  "name": "Solace BondDepository Monitoring",
  "description": "BondDepository at 0x0000000000000000000000000000000000020001: Teller Added with address 0x0000000000000000000000000000000000000001",
  "alertId": "SOLACE-1",
  "protocol": "ethereum",
  "severity": "Info",
  "type": "Info",
  "metadata": {
    "txHash": "0x0000000000000000000000000000000000000000000000000000000000000001",
    "sender": "0x0000000000000000000000000000000000010002",
    "timestamp": "1000000001",
    "blockNumber": "100"
  }
}
```

- The address `0x0000000000000000000000000000000000010002` submitted a transaction to remove a new BondTeller with address `0x0000000000000000000000000000000000000001` to the BondDepository at `0x0000000000000000000000000000000000020001`.

```JSON
{
  "name": "Solace BondDepository Monitoring",
  "description": "BondDepository at 0x0000000000000000000000000000000000020001: Teller Removed with address 0x0000000000000000000000000000000000000001",
  "alertId": "SOLACE-2",
  "protocol": "ethereum",
  "severity": "Info",
  "type": "Info",
  "metadata": {
    "txHash": "0x0000000000000000000000000000000000000000000000000000000000000001",
    "sender": "0x0000000000000000000000000000000000010002",
    "timestamp": "1000000001",
    "blockNumber": "100"
  }
}
```

## Try it out youself

- `npm run tx 0x438464e0017caeabd4f51951969480fbd4b2ab0a707ca4fc070f5fac53dac51c`, in Ethereum mainnet will trigger the following alert:

```
1 findings for transaction 0x438464e0017caeabd4f51951969480fbd4b2ab0a707ca4fc070f5fac53dac51c {
  "name": "Solace BondDepository Monitoring",
  "description": "BondDepository at 0x501ACe2f00EC599D4FDeA408680e192f88D94D0D: Teller Added with address 0x501aCef4F8397413C33B13cB39670aD2f17BfE62",
  "alertId": "SOLACE-1",
  "protocol": "ethereum",
  "severity": "Info",
  "type": "Info",
  "metadata": {
    "txHash": "0x438464e0017caeabd4f51951969480fbd4b2ab0a707ca4fc070f5fac53dac51c",
    "sender": "0x501ace0e8d16b92236763e2ded7ae3bc2dffa276",
    "timestamp": "1643607063",
    "blockNumber": "14111748"
  }
}
```
