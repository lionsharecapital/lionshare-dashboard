import s from 'styled-components';

export default ({ color }) => (
  <Container
    style={{ backgroundColor: color }}
  />
);

const Container = s.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;

  margin-top: 5px;
  margin-right: 11px;
`;
