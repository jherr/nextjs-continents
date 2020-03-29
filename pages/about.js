import Head from 'next/head'
import {
  Container,
  Typography,
  CssBaseline
} from '@material-ui/core'

const Home = () => (
  <div className="container">
    <Head>
      <title>About Us!</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <Container>
        <CssBaseline />
        <Typography variant="h2">
          About!
        </Typography>
      </Container>
    </main>
  </div>
)

export default Home
