import React from 'react';
import styled from 'styled-components';
import {
  MyView,
  SPACING,
  TextExtraBold,
  TextRegular,
  Wrapper,
} from '../layout/Layout';
import {NavigationScreenProp} from 'react-navigation';
import {Image} from 'react-native';
import Menu from '../assets/icons/menu.svg';
import {__COLORS} from '../layout/Colors';
import {getAlphaColor} from '../layout/AlphaColor';
import {InputField} from '../components/InputField';

const Container = styled(MyView)`
  flex: 1;
  margin-top: ${SPACING * 4}px;
`;

const Title = styled(TextExtraBold)`
  text-align: center;
`;
const Hack = styled(MyView)`
  position: absolute;
  top: ${SPACING * 7}px;
  left: ${SPACING * 3}px;
`;

const SubTitle = styled(TextRegular)`
  color: ${getAlphaColor(0.5, __COLORS.WHITE)};
  text-align: center;
  margin-top: -${SPACING / 2}px;
`;
const Header = styled(MyView)`
  padding-top: ${SPACING * 16}px;
`;
type Props = {
  navigation: NavigationScreenProp<any, any>;
};

type State = {
  searchValue: string;
};

class MainScreen extends React.Component<Props, State> {
  state = {
    searchValue: '',
  };
  componentDidMount(): void {}

  render() {
    const {navigation} = this.props;
    const {searchValue} = this.state;
    return (
      <>
        <Image
          style={{position: 'absolute'}}
          source={require('../assets/images/background.png')}
        />
        <Hack>
          <Menu width={40} height={40} />
        </Hack>
        <Wrapper number={1}>
          <Header>
            <Title fontSize={35}>This guil Recipe</Title>
            <SubTitle fontSize={20}>This guil Recipe</SubTitle>
          </Header>
          <Container>
            <InputField
              onTextChange={(searchValue: string) => {
                this.setState({searchValue});
              }}
              placeholder={'Search your recipe'}
              clear={() => {}}
              value={searchValue}
            />
          </Container>
        </Wrapper>
      </>
    );
  }
}
export default MainScreen;
