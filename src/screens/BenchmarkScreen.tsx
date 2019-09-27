import React from 'react';
import styled from 'styled-components';
import {Flex, MyView} from '../layout/Layout';
import {NavigationScreenProp} from 'react-navigation';

const Container = styled(Flex)`
  background: blue;
`;

type Props = {
    navigation: NavigationScreenProp<any, any>;
};

class BenchmarkScreen extends React.Component<Props, {}> {
    componentDidMount(): void {}

    render() {
        return <Container number={1} />;
    }
}
export default BenchmarkScreen;
