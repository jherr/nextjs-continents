import Head from 'next/head'
import Link from 'next/link'
import {
  Container,
  Typography,
  CssBaseline
} from '@material-ui/core'
import {
  Client
} from 'urql';
import fetch from 'node-fetch';
import gql from 'graphql-tag';

const client = new Client({
  url: 'https://countries.trevorblades.com/',
  fetch,
});

const QUERY = gql`{
  continents {
    code
    name
  }
}`;

export async function getServerSideProps() {
  return client
    .query(QUERY)
    .toPromise()
    .then(data => {
      return ({
        props: {
          continents: data.data.continents,
        },
      });
    });
}

const Home = ({ continents }) => (
  <div className="container">
    <Head>
      <title>Continents!</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <Container>
        <CssBaseline />
        <ul>
          {
            continents.map(({ code, name }) => (
              <li>
                <Typography variant="h4">
                  <Link href={`/continents/${code}`}>
                    {name}
                  </Link>
                </Typography>
              </li>
            ))
          }
        </ul>
        <Typography variant="h4">
          <Link href="/about">
            Go to about page
          </Link>
        </Typography>
      </Container>
    </main>
  </div>
)

export default Home
