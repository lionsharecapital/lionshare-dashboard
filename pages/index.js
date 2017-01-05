import _ from 'lodash';
import fetch from 'isomorphic-fetch';
import styled from 'styled-components';
import '../styles';
import constants from '../styles/constants';
import { Flex } from 'reflexbox';

import Header from '../components/Header';
import PriceList from '../components/PriceList';

const fetchData = async () => {
  try {
    const res = await fetch('https://lionshare-api.now.sh/api/prices');
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
      data: await fetchData(),
    };
  }

  state = {}

  componentDidMount = () => {
    // Re-fetch data every 10s
    setInterval(async () => {
      const data = await fetchData();
      if (data) this.setState({ data });
    }, 10 * 1000);

    // Reload page every hour
    setTimeout(() => {
      window.location.reload(false);
    }, 60 * 60 * 1000);
  }

  get priceListData() {
    return _.map(this.state.data || this.props.data, (data, key) => {
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
        <Header/>
        <PriceList assets={ this.priceListData } />
      </Container>
    );
  }
}

const Container = styled(Flex)`
  height: 100%;
  background-color: black;
`;
