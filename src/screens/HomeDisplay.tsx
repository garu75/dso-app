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

import { GET_MY_INFO, LOGOUT } from '../gql/queries/UserQueries';
import Footer from '../components/Footer';
import Menubar from '../components/Menubar';
import MyEngagementsDisplay from './MyEngagementsDisplay';
import BookmarkedEngagementsDisplay from './BookmarkedEngagementsDisplay';

type UserInfo = {
  isLoggedIn: boolean;
  name: string;
  profileImage: string;
  acceptedEngagements: [];
}

const HomeDisplay = (props: any) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    isLoggedIn: false,
    name: "",
    profileImage: "",
    acceptedEngagements: []
  });

  const [logout] = useMutation<boolean, null>(
    LOGOUT,
    {
      onCompleted: (data: any) => {
        if (data.logout) {
          setUserInfo({
            isLoggedIn: false,
            name: "",
            profileImage: "",
            acceptedEngagements: []
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
          profileImage: data.getMyInfo.profileImage,
          acceptedEngagements: data.getMyInfo.acceptedEngagements
        });
      }
    }
  );

  return (
    <ThemeProvider theme={appTheme}>
      <Menubar {...userInfo} logout={logout} />
      <Switch>
        <Route path="/login" render={() => <LoginDisplay history={props.history} setUserInfo={setUserInfo} />} />
        <Route path="/register" component={RegistrationDisplay} />
        {userInfo['isLoggedIn'] && <Route path='/profile' component={UserProfileDisplay} />}
        <Route exact path='/' component={EngagementsDisplay} />
        <Route exact path='/bookmarked' component={BookmarkedEngagementsDisplay} />
        <Route exact path='/myengagements' component={MyEngagementsDisplay} />
        <Route path='/details/:id' render={engagementDetailProps =>
          <EngagementDetail userInfo={userInfo} {...engagementDetailProps} />} />
      </Switch>
      <Footer />
    </ThemeProvider>
  );
}

export default HomeDisplay;