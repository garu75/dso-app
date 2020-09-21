import { gql, UserInputError } from 'apollo-server-express';
import bcrypt from 'bcrypt';
import Constants from '../../common/Constants';
import { UserModel } from './models/users/users.model';
import { IUserDocument } from './models/users/users.types';

const saltRounds = 10;

interface UserRegister {
  name: string;
  email: string;
  password: string;
}

const resolvers = {
  Query: {
    login: async (root: any, args: { email: string, password: string }, context: any) => {
      const { email, password } = args;
      //check if email exist
      const user = await UserModel.findOne({ email: email }).exec();
      if (!user) {
        return new Error('User not found');
      }
      //check for valid password
      const validPass = await bcrypt.compare(password, user.password);
      if (!validPass) {
        return new Error('Password is incorrect');
      }
      try {
        const generatedUser = await user.generateToken();
        context.res
          .cookie('authToken', generatedUser.token, {
            //store token as cookie
            expires: new Date(Date.now() + 32 * 3600000), // cookie will be removed after 32 hours
            httpOnly: true,
          });
        return  { name: generatedUser.name, email: generatedUser.email };
      } catch(err) {
        return new Error(err); 
      } 
    },
    register: async (root: any, args: UserRegister) => {
      const { name, email, password } = args;
      //hashing password
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = {
        name,
        email,
        password: hashedPassword,
        token: '',
        major: '',
        skills: [],
        role: Constants.ROLE_VOLUNTEER
      };

      // Save to mongodb
      try {
        await UserModel.create(user);
        return { name, email };
      } catch (err) {
        return new Error(err);
      }
    }
  },
};

export default resolvers;