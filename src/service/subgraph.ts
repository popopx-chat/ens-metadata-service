import { gql } from 'graphql-request';
import { namehash } from '@ensdomains/ensjs/utils';
import { SIMPLEX_TLD } from '../config';

// SNRC: the 2LD lookup filters on the parent TLD node. Upstream hardcoded
// namehash('eth'); we derive it from the configured TLD (.testing / .simplex).
const ETH_NAMEHASH = namehash(SIMPLEX_TLD);

export const GET_DOMAINS = gql`
  query getDomains($tokenId: String) {
    domain(id: $tokenId) {
      id
      labelhash
      name
      createdAt
      parent {
        id
      }
      resolver {
        texts
        address
      }
    }
  }
`;

export const GET_DOMAINS_BY_LABELHASH = gql`
  query getDomains($tokenId: String) {
    domains(
      where: {
        parent: "${ETH_NAMEHASH}",
        labelhash: $tokenId
      }
    ) {
      id
      labelhash
      name
      createdAt
      parent {
        id
      }
      resolver {
        texts
        address
      }
    }
  }
`;

export const GET_REGISTRATIONS = gql`
  query getRegistration($tokenId: String) {
    registrations(
      orderBy: registrationDate
      orderDirection: desc
      where: { id: $tokenId }
    ) {
      labelName
      registrationDate
      expiryDate
    }
  }
`;

export const GET_WRAPPED_DOMAIN = gql`
  query getWrappedDomain($tokenId: String) {
    wrappedDomain(id: $tokenId) {
      id
      owner {
        id
      }
      fuses
      expiryDate
      domain {
        name
      }
    }
  }
`;
