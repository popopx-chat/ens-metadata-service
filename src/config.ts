const path = require('path');
const { getAddress } = require('ethers');
require('dotenv').config();

// Normalise addresses to EIP-55 checksum form. checkContract() compares the
// route's contract address (run through ethers.getAddress) against these with
// `===`, so a lowercase override from the env would silently fail to match.
const checksum = (addr: string) => getAddress(addr);

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';
const ENV = process.env.ENV || 'local'; // local/prod
const REDIS_URL = process.env.REDIS_URL;

const FONT_FOLDER = path.join((ENV === 'local' ? 'src' : 'dist'), 'assets');
const CANVAS_FONT_PATH = path.join(FONT_FOLDER, 'Satoshi-Bold.ttf');
const CANVAS_EMOJI_FONT_PATH = path.join(FONT_FOLDER, 'NotoColorEmoji.ttf');
const INAMEWRAPPER = process.env.INAMEWRAPPER || '0xd82c42d8';

// --- SNRC customisations ---
// The deployment indexes our own ENS-shaped contracts on mainnet (the .testing
// / .simplex TLDs), served by the self-hosted Graph Node from
// simplex-namespace-contract/scripts/subgraph — not the public ENS subgraph.
// When set, SUBGRAPH_URL overrides the per-network table in service/network.ts.
const SUBGRAPH_URL = process.env.SUBGRAPH_URL || '';
// TLD used for display fallbacks (hashed / ellipsised names). Normalised names
// already carry their TLD via the subgraph `name` field.
const SIMPLEX_TLD = process.env.SIMPLEX_TLD || 'testing';
// dApp base URL used for the OpenSea `url` field (link back to the name page).
const DAPP_BASE_URL = process.env.DAPP_BASE_URL || 'https://testing-names.simplex.chat';

const IPFS_GATEWAY = process.env.IPFS_GATEWAY || 'https://ipfs.io';
const INFURA_API_KEY = process.env.INFURA_API_KEY || '';
const OPENSEA_API_KEY = process.env.OPENSEA_API_KEY || '';
const NODE_PROVIDER = process.env.NODE_PROVIDER || 'geth';
const NODE_PROVIDER_URL = process.env.NODE_PROVIDER_URL || 'http://localhost:8545';
const THE_GRAPH_API_KEY = process.env.THE_GRAPH_API_KEY || '';

// undocumented, temporary keys
const NODE_PROVIDER_URL_CF = process.env.NODE_PROVIDER_URL_CF || '';
const NODE_PROVIDER_URL_GOERLI = process.env.NODE_PROVIDER_URL_GOERLI || '';
const NODE_PROVIDER_URL_SEPOLIA = process.env.NODE_PROVIDER_URL_SEPOLIA || '';

const ADDRESS_ETH_REGISTRAR = checksum(process.env.ADDRESS_ETH_REGISTRAR || '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85');
const ADDRESS_ETH_REGISTRY = checksum(process.env.ADDRESS_ETH_REGISTRY || '0x00000000000c2e074ec69a0dfb2997ba6c7d2e1e');
const ADDRESS_NAME_WRAPPER = checksum(process.env.ADDRESS_NAME_WRAPPER || '0x114D4603199df73e7D157787f8778E21fCd13066');

const SERVER_URL =
  ENV === 'local' ? `http://localhost:${PORT}` : `https://${HOST}`;

const ETH_REGISTRY_ABI = [
  'function recordExists(bytes32 node) external view returns (bool)'
];

const NAMEWRAPPER_ABI = [
  'function isWrapped(bytes32 node) public view returns (bool)'
];

// response timeout: 1 min
const RESPONSE_TIMEOUT = 15 * 1000;

// Maximum content length for fetched images (50MB)
const MAX_CONTENT_LENGTH = 50000000;

export {
  ADDRESS_ETH_REGISTRAR,
  ADDRESS_ETH_REGISTRY,
  ADDRESS_NAME_WRAPPER,
  DAPP_BASE_URL,
  SIMPLEX_TLD,
  SUBGRAPH_URL,
  CANVAS_FONT_PATH,
  CANVAS_EMOJI_FONT_PATH,
  ETH_REGISTRY_ABI,
  NAMEWRAPPER_ABI,
  INAMEWRAPPER,
  IPFS_GATEWAY,
  INFURA_API_KEY,
  MAX_CONTENT_LENGTH,
  OPENSEA_API_KEY,
  REDIS_URL,
  NODE_PROVIDER,
  NODE_PROVIDER_URL,
  NODE_PROVIDER_URL_CF,
  NODE_PROVIDER_URL_GOERLI,
  NODE_PROVIDER_URL_SEPOLIA,
  RESPONSE_TIMEOUT,
  SERVER_URL,
  THE_GRAPH_API_KEY
};
