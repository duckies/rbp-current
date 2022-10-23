import css from 'styles/pages/ui.module.scss';
import Container from 'components/Container';
import Card from 'components/Card';

export default function UIPage() {
  return (
    <div className={css.wrapper}>
      <Container>
        <Card>
          <h1>Pint-Sized Pink Pachyderm</h1>
          <h2>Pint-Sized Pink Pachyderm</h2>
          <h3>Pint-Sized Pink Pachyderm</h3>
          <h4>Pint-Sized Pink Pachyderm</h4>
          <h5>Pint-Sized Pink Pachyderm</h5>
          <h6>Pint-Sized Pink Pachyderm</h6>
          <p>
            Sed nulla tortor, tempus at malesuada ac, maximus eget elit. Nulla
            facilisi. Nullam faucibus, massa sit amet dictum imperdiet, turpis
            velit porta orci, eget pellentesque felis enim eu diam. Aenean non
            hendrerit magna. Phasellus in magna ligula. Duis maximus eget leo at
            aliquam. Nunc laoreet molestie enim, vitae luctus tortor ullamcorper
            quis. Nunc sed interdum libero. Aenean venenatis est sem, non
            sollicitudin sapien rhoncus vel. Cras consequat dapibus tristique.
            Maecenas sed urna non diam efficitur vehicula. Duis tempus felis
            ornare turpis accumsan dictum. Fusce vel est lacus. Etiam eleifend
            aliquam felis, bibendum pretium tellus tincidunt at.
          </p>
        </Card>
      </Container>
    </div>
  );
}
