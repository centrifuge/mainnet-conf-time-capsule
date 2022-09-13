## Time Capsule UI

#### Prerequisites

- node
- yarn
- [netlify CLI](https://docs.netlify.com/cli/get-started/)
- [chromium](https://formulae.brew.sh/cask/chromium)

#### Installation

1. Clone the repo

   ```sh
   $ git clone git@github.com:centrifuge/mainnet-conf-time-capsule.git
   ```

2. Change directory

   ```sh
   $ cd client
   ```

3. Install packages

   ```sh
   $ yarn install
   ```

4. Add `.env` file

   ```sh
   CHROMIUM_PATH=<path-to-chromium-binary> # mine is /usr/local/bin/chromium
   NETWORK=<testnet|mainnet>
   ```

5. Link Netlify project

   ```sh
   $ netlify login
   ```

   ```sh
   $ netlify link

   --

   > Search by full or partial site name

   --

   Enter the site name (or just part of it): time-capsule
   ```

6. Run development environment on [localhost:8888](http://localhost:8888)

```sh
$ yarn dev
```

#### API Spec

| Type     | Endpoint                                        | Headers                                             | Body                                                                                                     | Response                                                                                                                                                                                                                                                |
| -------- | ----------------------------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DELETE` | `/api/deleteTimeCapsule`                        | <pre>{<br /> admin-passphrase: string;<br />}</pre> | <pre>{<br /> id: string;<br />}</pre>                                                                    | <pre>'Successfully deleted &lt;id&gt;' <br />&vert;<br />string<br />&vert;<br />Error</pre>                                                                                                                                                            |
| `POST`   | `/api/postTimeCapsule`                          | `--`                                                | <pre>{<br /> polygonAddress: string;<br /> prediction: string;<br /> twitterHandle: string;<br />}</pre> | <pre>{<br /> id: string;<br />}<br />&vert;<br />string<br />&vert;<br />Error</pre>                                                                                                                                                                    |
| `GET`    | `/api/getTimeCapsules`                          | `--`                                                | `--`                                                                                                     | <pre>{<br /> id: string;<br /> svgLink: string;<br /> timestamp: number;<br />}[]<br />&vert;<br />string<br />&vert;<br />Error</pre>                                                                                                                  |
| `GET`    | `/api/getTimeCapsule?id=<nft-id>`               | `--`                                                | `--`                                                                                                     | <pre>{<br /> pngLink: string<br /> hash: string;<br /> status: 'failed' &vert; 'minted' &vert; 'not found' &vert; 'pending' &vert; 'queued'<br /> svgLink: string;<br />}<br />&vert;<br />boolean<br />&vert;<br />string<br />&vert;<br />Error</pre> |
| `GET`    | `/api/getTimeCapsuleForMarketplace?id=<nft-id>` | `--`                                                | `--`                                                                                                     | <pre>{<br /> description: 'Your prediction for DeFi in 2023';<br /> image: string;<br /> name: 'Centrifuge Time Capsule';<br />}<br />&vert;<br />string<br />&vert;<br />Error</pre>                                                                   |
