# Litmus Example App

This an example app that uses the Litmus Service Worker to fetch and validate data on Casper blockchain.

## Communication with Service Worker

The app communicates with the Service Worker using the `postMessage` API. The Service Worker listens for messages from
the app and responds with the requested data.

Service Worker updates the `WorkerState` object, that has followng properties:

`last_block`?: Block | null

`trusted_hash`: string

`trusted_block`?: { era: number; block_height: number; block_hash: string }

`last_validated`?: { era: number; block_height: number }

`fetch_blocks`?: number

`validate_blocks`?: number

`fetch_progress`: number

`fetch_eta`?: number

`validate_progress`: number

`validate_eta`?: number

`message`: MessageState | null

`status`: 'idle' | 'processing' | 'searching' | 'error'

`last_switch_block`?: Block | null

`validators_records_count`?: number

`validated_eras`?: { minEra: number; maxEra: number }

`validated_block_heights`?: { minBlockHeight: number; maxBlockHeight: number }

`total_rpcs`?: number

`available_rpcs`?: number

## Developing locally

Install packages,run the development server and open [http://localhost:3000](http://localhost:3000)

```bash
npm i
npm run dev
```
