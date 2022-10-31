import type { AdvancedOptions } from '../../../core/interfaces/resource-options.interface';
import type { RealmSlug } from '../../../core/realms';

export interface ProfileOptions extends AdvancedOptions {
  realm: RealmSlug
  name: string
}
