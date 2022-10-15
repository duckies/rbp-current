declare interface AppConfig {
  /**
   * Base url for server requests.
   */
  API_URL: string;

  /**
   * Discord authorization client id.
   */
  DISCORD_CLIENT_ID: string;
}

const config: AppConfig = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030',
  DISCORD_CLIENT_ID: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!,
};

export default config;
