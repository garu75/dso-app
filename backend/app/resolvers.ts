import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import Constants from '../../common/Constants';
import { UserModel } from './models/users/users.model';
import { IAssignment, IAssignmentDocument } from './models/assignments/assignments.types';
import { AssignmentModel } from './models/assignments/assignments.model';

const saltRounds = 10;

interface UserRegister {
  name: string;
  email: string;
  password: string;
}

const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date object for processing datetime',
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseValue(value) {
      return new Date(value); // value from the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    }
  }),
  Query: {
    /** User APIs */
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
        return { name: generatedUser.name, email: generatedUser.email };
      } catch (err) {
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
    },
    /** Assignment APIs */
    getAssignment: (root: any, args: { _id: Schema.Types.ObjectId }, context: any) => {
      return AssignmentModel.findOne({_id: args._id})
      .catch(err => { return new Error(err) });
    },
    getAllAssignments: (root: any, args: { }, context: any) => {
      return AssignmentModel.find()
      .catch(err => { return new Error(err) });
    },
  },
  Mutation: {
    /** Assignment APIs */
    createAssignment: (root: any, args: { assignment: IAssignment }, context: any) => {
      return AssignmentModel.create(args.assignment)
        .catch(err => { return new Error(err) });
    },
    updateAssignment: (root: any, args: { assignment: IAssignmentDocument }, context: any) => {
      const { assignment } = args;
      return AssignmentModel.findOneAndUpdate({ _id: assignment._id }, assignment, {})
        .catch(err => { return new Error(err) });
    },
    deleteAssignment: (root: any, args: { _id: Schema.Types.ObjectId }, context: any) => {
      const _id = args._id;
      return AssignmentModel.deleteOne({ _id }, {}).then(res => { return res.deletedCount === 1 })
        .catch(err => { return new Error(err) });
    },
  }
};

export default resolvers;