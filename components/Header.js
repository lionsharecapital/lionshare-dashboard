import s from 'styled-components';
import constants from '../styles/constants';

export default () => (
  <Header>
    🦁 Lionshare
  </Header>
);

const Header = s.div`
  padding: 10px 20px;
  background-color: ${ constants.black };
  border-bottom: 1px solid ${ constants.gray };

  font-size: 36px;
  font-weight: 600;
  color: ${ constants.gray };
`;
