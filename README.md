# Litmus Example App

This an example app that uses the Litmus Service Worker to fetch and validate data on Casper blockchain.

## About Litmus

One of the core features of any blockchain is the ability to verify data. Typically, data about a block, transaction, or account is obtained by querying an RPC node and parsing its response. However, this method does not guarantee the validity of the returned data. Litmus' mission is to empower DApps with the ability to verify any response from the blockchain directly in the browser, enhancing the security and reliability of decentralized applications.

## Preparing the Service Worker

Litmus demo app comes with a precompiled service worker and WASM module. However, it is recommended to compile the service worker and WASM module yourself.
Please see the following repositories:
(https://github.com/cspr-rad/litmus-worker)[https://github.com/cspr-rad/litmus-worker]
(https://github.com/cspr-rad/litmus-wasm)[https://github.com/cspr-rad/litmus-wasm]

## Communication with Service Worker

The app communicates with the Service Worker using the `postMessage` API. The Service Worker listens for messages from
the app and responds with the requested data.

Service Worker updates the `WorkerState` object, that has followng properties:

`last_block`
Returns the last fetched block in the JSON format.

`trusted_hash`
Returns the currently set trusted block hash.

`trusted_block`
Trusted switch block.

`last_validated`
Last validated switch block height and era is.

`fetch_blocks`
Number of blocks to fetch.

`validate_blocks`
Number of blocks to validate.

`fetch_progress`
Progress of fetching blocks.

`fetch_eta`
Estimated time to fetch all blocks.

`validate_progress`
Progress of validating blocks.

`validate_eta`
Estimated time to validate all blocks.

`status`
Status of the worker.

`last_switch_block`
Last found switch block.

`validated_eras`
Validated eras range.

`validated_block_heights`
Validated block heights range.

`total_rpcs`
Number of RPCs nodes.

`available_rpcs`
Number of available RPCs nodes.

`account`
Account address to validate.

`balance_CSPR`
Balance of the account.

`balance_motes`
Balance of the account in motes.

`account_state_root_hash`
Account state root hash.

`merkle_proof_parsed`
Merkle proof parsed as JSON.

`error`
Error message. Cleared on any message to Worker.

`info`
Information message. Cleared on any message to Worker.

## Developing locally

Install packages,run the development server and open [http://localhost:3000](http://localhost:3000)

```bash
npm i
npm run dev
```
