export interface ClientCredentialResponse {
  access_token: string
  refresh_token?: string
  token_type: string
  expires_in: number
}
