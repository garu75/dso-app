import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import EngagementsDisplay from './EngagementsDisplay';
import EngagementDetail from './EngagementDetail';
import RegistrationDisplay from './RegistrationDisplay';
import UserProfileDisplay from './UserProfileDisplay';
import LoginDisplay from './LoginDisplay';
import appTheme, { appColors } from '../theme/globalTheme';

import { GET_MY_INFO, LOGOUT } from '../gql/queries/Authentication';
import Footer from '../components/Footer';
import Menubar from '../components/Menubar';

type UserInfo = {
  isLoggedIn: boolean;
  name: string;
  profileImage: string;
}

const HomeDisplay = (props: any) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    isLoggedIn: false,
    name: "",
    profileImage: ""
  });

  const [logout] = useMutation<boolean, null>(
    LOGOUT,
    {
      onCompleted: (data: any) => {
        if (data.logout) {
          setUserInfo({
            isLoggedIn: false,
            name: "",
            profileImage: ""
          });
        }
      },
      onError: (err: any) => console.log(err)
    }
  )

  useQuery<boolean, null>(
    GET_MY_INFO,
    {
      onCompleted: (data: any) => {
        console.log(data);
        setUserInfo({
          isLoggedIn: true,
          name: data.getMyInfo.name,
          profileImage: data.getMyInfo.profileImage
        });
      }
    }
  );

  return (
    <ThemeProvider theme={appTheme}>
      <Menubar {...userInfo} logout={logout} />
      <Switch>
        <Route path="/login" render={() => <LoginDisplay history={props.history} setUserInfo={setUserInfo} /> } />
        <Route path="/register" component={RegistrationDisplay} />
        {userInfo['isLoggedIn'] && <Route path='/profile' component={UserProfileDisplay} />}
        <Route exact path='/' component={EngagementsDisplay} />
        <Route path='/details/:id' component={EngagementDetail} />
      </Switch>

      <Footer />
    </ThemeProvider>
  );
}

export default HomeDisplay;