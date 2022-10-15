import Textfield from 'components/forms/Textfield';
import { DefaultLayout } from 'components/layouts/DefaultLayout';

export default function AboutPage() {
  return (
    <DefaultLayout>
      <h1>About Page</h1>

      <Textfield id="1" label="Character Name" />
    </DefaultLayout>
  );
}
