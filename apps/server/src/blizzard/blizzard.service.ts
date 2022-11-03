import { Injectable, Logger } from '@nestjs/common';
import Queue from 'p-queue';
import { WoWClient } from '@rbp/battle.net';
import { BlizzardConfig } from '../app.config';
import { HttpService } from '../common/http/http.service';
import { FindCharacterDTO } from '../character/dto/character.dto';

@Injectable()
export class BlizzardService {
  private readonly logger = new Logger(BlizzardService.name);
  private token: string | null = null;
  public readonly client: WoWClient;

  constructor(
    private readonly config: BlizzardConfig,
    private readonly http: HttpService,
    private readonly queue: Queue,
  ) {
    this.client = new WoWClient({
      clientId: config.ID,
      clientSecret: config.SECRET,
      defaults: {
        region: 'us',
        locale: 'en_US',
      },
    });
  }

  async getCharacter(findCharacterDTO: FindCharacterDTO) {
    return this.client.profile.getCharacterProfileSummary(findCharacterDTO).json();
  }
}
