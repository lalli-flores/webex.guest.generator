import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import {randomBytes} from 'crypto';

const TOKEN_EXCHANGE_URL = 'https://webexapis.com/v1/jwt/login';
const WEBEX_ME_URL = 'https://webexapis.com/v1/people/me';

/**
 * Returns a JWT token for a Webex guest user.
 * JWT token expires after a day.
 *
 * @param {string} guestName    Display name for the guest user
 * @param {string} issuerID     Guest issuer app ID
 * @param {string} issuerSecret Matching guest issuer app secret
 *
 * @returns {string} JWT Token
 */
export function getGuestToken(guestName, issuerID, issuerSecret) {
  const payload = {
    // Display name of guest user
    name: guestName,
  };

  const options = {
    subject: randomBytes(16).toString('base64'),
    issuer: issuerID,
    expiresIn: '1 days'
  };

  return jwt.sign(
    payload,
    Buffer.from(issuerSecret, 'base64'),
    options
  );
}

/**
 * Returns an authorized OAuth access token token for the given JWT guest token.
 *
 * @param {string} jwtToken Guest JWT token
 *
 * @returns  Access token and expiration
 */
export async function getGuestAccessToken(jwtToken) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${jwtToken}`
  };

  const response = await fetch(
    TOKEN_EXCHANGE_URL,
    {
      method: 'POST',
      headers
    }
  );

  return response.json();
}

export async function getGuestData(accessToken) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`
  };

  const response = await fetch(
    WEBEX_ME_URL,
    {
      method: 'GET',
      headers
    }
  );

  return response.json();
}