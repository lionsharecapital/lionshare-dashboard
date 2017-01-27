import s from 'styled-components';

export default ({ color }) => (
  <Container
    style={{ backgroundColor: color }}
  />
);

const Container = s.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;

  margin-right: 11px;
`;
