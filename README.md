# Webex Guest Generator

This script generates a guest user and its access token from a [Webex Guest Issuer Application](https://developer.webex.com/docs/guest-issuer).

## Usage

1. You will need to have a [Guest Issuer Application with Webex](https://developer.webex.com/docs/guest-issuer)
2. Create a JSON file with the following contents, you may name it `config.json`:

    ```json
    {
      "id": "Guest issuer ID",
      "secret": "Guest issuer secret",
      "name": "Display name of guest user"
    }
    ```

3. Run the following command:

    ```bash
    npx webex-guest-generator config.json
    ```

    Substitute `config.json` with the name of your file, if different.

Generated token is **valid for one day**.
