import EbayAuthToken from 'ebay-oauth-nodejs-client';

export class EbayAuth {
  private ebayAuthToken: EbayAuthToken;
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;

  constructor(clientId: string, clientSecret: string, redirectUri: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;

    
    this.ebayAuthToken = new EbayAuthToken({
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      redirectUri: this.redirectUri,
    });
  }



  async getApplicationToken(enviroment: any): Promise<string> {
    const data = await this.ebayAuthToken.getApplicationToken(enviroment);
    
    const token = JSON.parse(data);
    return token.access_token;
  }

  async getRefreshToken(): Promise<string> {
    const data = await this.ebayAuthToken.getRefreshToken();
    return data;
  }
}


export default EbayAuth;