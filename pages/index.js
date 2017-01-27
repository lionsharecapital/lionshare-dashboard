import _ from 'lodash';
import fetch from 'isomorphic-fetch';
import styled from 'styled-components';
import ReconnectingWebsocket from 'reconnecting-websocket';
import '../styles';
import constants from '../styles/constants';
import { Flex } from 'reflexbox';

import PriceList from '../components/PriceList';

const WS_URL = 'wss://api.lionshare.capital';
const API_URL = 'https://lionshare-api.now.sh/api/prices';
const SUPPORTED_CURRENCIES = [
  'BTC',
  'ETH',
  'LTC',
  'REP',
  'ZEC',
  'XMR',
]

const fetchData = async () => {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default class extends React.Component {
  static async getInitialProps ({ req }) {
    return req && {
      data: await fetchData()
    };
  }

  state = {
    websocketConnected: false,
    prices: {},
    data: null,
    currentAsset: 0
  }

  componentDidMount = () => {
    // Set initial server fetched data
    this.setState({ data: this.props.data });

    const websocket = new ReconnectingWebsocket(WS_URL, [], { debug: true });

    // Handle updates from push events
    websocket.addEventListener('message', message => {
      const wsData = JSON.parse(message.data);
      if (wsData && SUPPORTED_CURRENCIES.includes(wsData.cryptoCurrency)) {
        const data = this.state.data;
        data[wsData.cryptoCurrency].price = wsData.price;
        this.setState({ data });
      }
    });

    // Handle connection state
    websocket.onopen = () => this.setState({ websocketConnected: true });
    websocket.onclose = () => this.setState({ websocketConnected: false });
    websocket.onerror = () => this.setState({ websocketConnected: false });


    // Cycle through the assets
    setInterval(() => {
      this.setState({
        currentAsset: (this.state.currentAsset + 1) % Object.keys(this.state.data).length
      })
    }, 5000);

    // Reload page every hour
    setTimeout(() => {
      window.location.reload(false);
    }, 60 * 60 * 1000);
  }

  get priceListData() {
    return _.map(this.state.data, (data, key) => {
      const color = constants[`currency${key}`];
      const historic = [];
      for (let rate of data.historic) {
        // Need to multiply by 100, so that chartjs detects
        // small changes.
        historic.push(rate * 100);
      }

      return {
        color,
        symbol: key,
        price: parseFloat(data.price),
        change: _.round(data.change * 100, 2),
        chartData: {
          labels: ['', '', '', '', '', '', '', '', '', '', '', ''],
          datasets: [{
            strokeColor: color,
            data: historic.slice(0, 12),
          }],
        },
      };
    });
  }

  render() {
    return (
      <Container column>
        { this.state.data && Object.keys(this.state.data).length ? (
          <PriceList
            assets={ this.priceListData }
            currentAsset={this.state.currentAsset}
          />
        ) : <div></div> }
      </Container>
    );
  }
}

const Container = styled(Flex)`
  height: 100%;
  background-color: black;
`;
