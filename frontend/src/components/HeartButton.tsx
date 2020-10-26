import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useMutation } from '@apollo/client';
import { GetUserData, SAVE_ENGAGEMENT } from '../gql/queries/UserQueries';

interface HeartButtonProps {
  _id: string;
  isSaved: boolean;
}

const HeartButton = (props: HeartButtonProps) => {
  const [isSaved, setIsSaved] = useState<boolean>(props.isSaved);
  const [saveEngagement] = useMutation<GetUserData, { [key: string]: string }>(SAVE_ENGAGEMENT, {
    onCompleted: (data: any) => {
      setIsSaved(true);
    },
    onError: (err: any) => console.log(err)
  });

  const onSave = () => {
    if (!isSaved) {
      saveEngagement({ variables: { engagementId: props._id } });
    }
  }

  return (
    <IconButton style={{ paddingTop: 0, height: 'fit-content' }} onClick={onSave}>
      <FavoriteIcon
        style={{ color: `${isSaved ? '#EF7471' : '#d8d8d8'}` }}
        fontSize='large' />
    </IconButton>
  );
}

export default HeartButton;