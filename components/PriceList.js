import s from 'styled-components';
import { Flex } from 'reflexbox';
import { Line } from 'react-chartjs';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import constants from '../styles/constants';
import { formatNumber } from '../utils/formatting';

import CurrencyColor from './CurrencyColor';

const PriceList = ({ assets, currentAsset }) => {
  const asset = assets[currentAsset];
  return (
    <ReactCSSTransitionGroup
      transitionName="assetPanel"
      transitionEnterTimeout={1000}
      transitionLeaveTimeout={1000}
    >
      {[
        <AssetPanel
          key={asset.symbol}
          { ...asset }
        />
      ]}
    </ReactCSSTransitionGroup>
  );
}

const AssetPanel = ({
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

  const chartWidth = typeof window !== 'undefined' ? window.innerWidth : 500;
  const chartHeight = typeof window !== 'undefined' ? window.innerHeight : 500;

  return (
    <AssetPanelContainer>
      <CurrencyInformation>
        <Flex align="center">
          <CurrencyColor color={ color } />
          <Symbol>{ symbol }</Symbol>
        </Flex>
        <Flex column>
          <Price>{ formatNumber(price, 'USD') }</Price>
          <Direction direction={ direction }>{ directionSymbol }{ change }%</Direction>
        </Flex>
      </CurrencyInformation>

      <ChartLineContainer>
        <ChartLine>
          <Line
            width={chartWidth}
            height = {chartHeight}
            data={ chartData }
            options={ chartOptions }
            style={{ transition: 'opacity 0.25s ease' }}
            redraw
          />
        </ChartLine>
      </ChartLineContainer>

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
    </AssetPanelContainer>
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

const Symbol = s.div`
  font-size: 60px;
  line-height: 1.2;
`;

const Price = s.div`
  font-size: 48px;
  line-height: 1.2;
`;

const Direction = s.div`
  color: ${ props => props.direction === 'up' ? constants.up : constants.down }
`;

const HighLow = s(Flex)`
  position: absolute;
  bottom: 20px;
  right: 30px;
  font-size: 36px;
  width: 150px;
  z-index: 2;
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

const AssetPanelContainer = s.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  padding: 16px;
`

const ChartLineContainer = s.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  z-index: 1;
`

const ChartLine = s.div`
  transform: scale(0.9);
`

const CurrencyInformation = s.div`
  z-index: 2;
  position: relative;
`

export default PriceList;
