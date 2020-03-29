import Head from 'next/head'
import {
  Container,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  makeStyles,
  CssBaseline,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoneyIcon from '@material-ui/icons/Money';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import {
  Client
} from 'urql';
import fetch from 'node-fetch';
import gql from 'graphql-tag';

const client = new Client({
  url: 'https://countries.trevorblades.com/',
  fetch,
});

const QUERY = gql`query($code: ID!="NA") {
  continent(code: $code) {
    countries {
      name
      currency
      emoji
      phone
      capital
      currency
      languages {
        name
      }
    }
  }
}`;

export async function getServerSideProps({ query }) {
  return client
    .query(QUERY, query)
    .toPromise()
    .then(data => {
      return ({
        props: {
          code: query.code,
          data: data.data.continent,
        },
      });
    });
}

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const Home = ({ code, data }) => {
  const classes = useStyles();
  return (
    <div className="container">
      <Head>
        <title>Countries in {code}!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          <CssBaseline />
          <Typography variant="h3">Countries in {code}!</Typography>
          {
            data.countries.map(({
              name,
              currency,
              emoji,
              capital,
              phone,
            }) => (
                <ExpansionPanel key={name}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`${name}-content`}
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>
                      {emoji} {name}
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <MoneyIcon />
                        </ListItemIcon>
                        <ListItemText primary={currency} />
                      </ListItem>

                      <ListItem>
                        <ListItemIcon>
                          <PhoneIcon />
                        </ListItemIcon>
                        <ListItemText primary={phone} />
                      </ListItem>

                      <ListItem>
                        <ListItemIcon>
                          <LocationCityIcon />
                        </ListItemIcon>
                        <ListItemText primary={capital} />
                      </ListItem>
                    </List>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              ))
          }
        </Container>
      </main>
    </div>
  );
}

export default Home
