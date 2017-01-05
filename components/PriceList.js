import s from 'styled-components';
import { Flex } from 'reflexbox';
import { Line } from 'react-chartjs';

import constants from '../styles/constants';
import { formatNumber } from '../utils/formatting';

import CurrencyColor from './CurrencyColor';

const PriceList = ({ assets }) => (
  <Flex auto>
    <Flex auto column justify="space-between" style={{ marginRight: '60px', padding: '6% 0' }}>
      { assets.slice(0,3).map(asset => (
        <AssetRow
          key={ asset.symbol }
          { ...asset }
        />
      )) }
    </Flex>
    <Flex auto column justify="space-between" style={{ padding: '6% 0' }}>
      { assets.slice(3,6).map(asset => (
        <AssetRow
          key={ asset.symbol }
          { ...asset }
        />
      )) }
    </Flex>
  </Flex>
);

const AssetRow = ({
  symbol,
  color,
  price,
  change,
  chartData,
}) => {
  const direction = change >= 0 ? 'up' : 'down';
  const directionSymbol = direction === 'up' && '+';
  const chartOptions = {
    showTooltips: false,
    pointDot: false,
    scaleShowLabels: false,
    datasetFill: false,
    scaleFontSize: 0,
    animation: false,
  };
  const chartHigh = (Math.max(...chartData.datasets[0].data) / 100.0).toFixed(2);
  const chartLow = (Math.min(...chartData.datasets[0].data) / 100.0).toFixed(2);

  return (
    <Row
      align="center"
      justify="space-between"
    >
      <Flex>
        <CurrencyColor color={ color } />
        { symbol }
        <Flex column style={{ marginLeft: '15px' }}>
          <Price>{ formatNumber(price, 'USD') }</Price>
          <Direction direction={ direction }>{ directionSymbol }{ change }%</Direction>
        </Flex>
      </Flex>
      <Flex align="center">
        <Line
          width="200"
          height="42" data={ chartData }
          options={ chartOptions }
          style={{ transition: 'opacity 0.25s ease' }}
          redraw
        />
        <HighLow justify="flex-end">
          <Flex column justify="space-between">
            <High justify="space-between">
              <Label>H</Label>
              <Amount>{ chartHigh }</Amount>
            </High>
            <Low justify="space-between">
              <Label>L</Label>
              <Amount>{ chartLow }</Amount>
            </Low>
          </Flex>
        </HighLow>
      </Flex>
    </Row>
  );
};

const Row = s(Flex)`
  position: relative;
  flex-shrink: 0;
  padding: 35px 15px;

  & + .row {
    border-top: 1px solid ${ constants.darkGray };
  }
`;

const Price = s.div`
  font-size: 36px;
  line-height: 1.2;
`;

const Direction = s.div`
  color: ${ props => props.direction === 'up' ? constants.up : constants.down }
`;

const HighLow = s(Flex)`
  padding-right: 15px;
  padding-left: 15px;
  font-size: 18px;
  width: 150px;
`;

const High = s(Flex)`
  margin-top: 2px;
`;

const Low = s(Flex)`
  margin-top: 2px;
  margin-bottom: 2px;
`;

const Cap = s(Flex)`
  margin-bottom: 4px;
`;

const Label = s.span`
  color: ${ constants.gray };
  margin-right: 5px;
`;

const Amount = s.span`

`;

export default PriceList;
