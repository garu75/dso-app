import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import Constants from '../../common/Constants';
import { UserModel } from './models/users/users.model';
import { IAssignment, IAssignmentDocument } from './models/assignments/assignments.types';
import { AssignmentModel } from './models/assignments/assignments.model';
import { IUser } from './models/users/users.types';

const saltRounds = 10;

const userPopulateFields = ['acceptedAssignments', 'completedAssignments', 'savedAssignments'];

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
    register: async (root: any, args: { user: IUser }, context: any) => {
      const { name, email, password, skills, role, major } = args.user;
      //hashing password
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = {
        name,
        email,
        password: hashedPassword,
        token: '',
        major,
        skills,
        role,
        completedAssignments: [],
        acceptedAssignments: [],
        savedAssignments: []
      };

      // Save to mongodb
      return UserModel.create(user);
    },
    getMyInfo: (root: any, args: {}, context: any) => {
      const { user } = context;
      if (!user) {
        return new Error("Not Logged In");
      }
      return UserModel.findOne({ _id: user._id })
        .populate(userPopulateFields)
        .catch(err => { return new Error(err) });
    },
    /** Assignment APIs */
    getAssignment: (root: any, args: { _id: Schema.Types.ObjectId }, context: any) => {
      return AssignmentModel.findOne({ _id: args._id })
        .catch(err => { return new Error(err) });
    },
    getAllAssignments: (root: any, args: {}, context: any) => {
      return AssignmentModel.find()
        .catch(err => { return new Error(err) });
    },

    searchAssignments: (root: any, args: { searchString: string }, context: any) => {
      const encapsulatedString = "\"" + args.searchString + "\"";
      return AssignmentModel.find({
        $text: {
          $search: encapsulatedString
        }
      })
        .catch(err => { return new Error(err) });
    },
  },
  Mutation: {
    /** Assignment APIs */
    createAssignment: (root: any, args: { assignment: IAssignment }, context: any) => {
      const { user } = context;
      if (!user) {
        return new Error("Not Logged In");
      }
      const { assignment } = args;
      assignment.creator = user._id;
      assignment.status = Constants.STATUS_UNASSIGNED;
      return AssignmentModel.create(assignment)
        .catch(err => { return new Error(err) });
    },
    updateAssignment: (root: any, args: { assignment: IAssignmentDocument }, context: any) => {
      const { assignment } = args;
      return AssignmentModel.findOneAndUpdate({ _id: assignment._id }, assignment, { new: true })
        .catch(err => { return new Error(err) });
    },
    deleteAssignment: (root: any, args: { _id: Schema.Types.ObjectId }, context: any) => {
      const _id = args._id;
      return AssignmentModel.deleteOne({ _id }, {}).then(res => { return res.deletedCount === 1 })
        .catch(err => { return new Error(err) });
    },
    /** User Assignment APIs */
    acceptAssignment: async (root: any, args: { assignmentId: Schema.Types.ObjectId }, context: any) => {
      const { user } = context;
      if (!user) {
        return new Error("Not Logged In");
      }
      const assignment = await AssignmentModel.findOneAndUpdate({ 
          _id: args.assignmentId, 
          status: Constants.STATUS_UNASSIGNED
        }, {
          $set: {
            status: Constants.STATUS_ACCEPTED
          }
        }).exec();
      if (assignment) {
        return UserModel
          .findOneAndUpdate({ _id: user._id }, { $addToSet: { acceptedAssignments: args.assignmentId } }, 
            { new: true })
          .populate(userPopulateFields);
      } else {
        return new Error("Assignment not available");
      }
    },
    completeAssignment: async (root: any, args: { assignmentId: Schema.Types.ObjectId }, context: any) => {
      const { user } = context;
      const assignmentId = args.assignmentId;
      if (!user) {
        return new Error("Not Logged In");
      }
      const assignment = 
        await AssignmentModel.findOne({ _id: assignmentId, status: Constants.STATUS_ACCEPTED }).exec();

      if (assignment) {
        return UserModel.findOneAndUpdate({
          _id: user._id,
          acceptedAssignments: assignmentId
        }, {
          $addToSet: {
            completedAssignments: assignmentId
          },
          $pull: {
            acceptedAssignments: assignmentId
          }
        }, { new: true }).populate(userPopulateFields)
        .then(async updatedUser => {
          if (updatedUser) {
            await AssignmentModel.findOneAndUpdate({ _id: assignmentId }, {
              $set: {
                status: Constants.STATUS_COMPLETED
              }
            }).exec();
          }
          return updatedUser;
        });
      } else {
        return new Error("Assignment not currently accepted");
      }
    },
    saveAssignment: async (root: any, args: { assignmentId: Schema.Types.ObjectId }, context: any) => {
      const { user } = context;
      if (!user) {
        return new Error("Not Logged In");
      }
      const assignment = await AssignmentModel.findOne({ 
        _id: args.assignmentId, 
        status: Constants.STATUS_UNASSIGNED
      }).exec();
    if (assignment) {
      return UserModel
        .findOneAndUpdate({ _id: user._id }, { $addToSet: { savedAssignments: args.assignmentId } }, 
          { new: true })
        .populate(userPopulateFields);
    } else {
      return new Error("Assignment not available");
    }
    },
  }
};

export default resolvers;