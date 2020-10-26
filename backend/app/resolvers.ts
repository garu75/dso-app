import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import Constants from '../../common/Constants';
import { UserModel } from './models/users/users.model';
import { IEngagement, IEngagementDocument } from './models/engagements/engagements.types';
import { EngagementModel } from './models/engagements/engagements.model';
import { IUser } from './models/users/users.types';

const saltRounds = 10;

const userPopulateFields = ['acceptedEngagements', 'completedEngagements', 'savedEngagements'];

const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date object for processing datetime',
    serialize(value) {
      return value; // value sent to the client
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
    checkAuth: (root: any, args: {}, context: any) => {
      return context.user !== null;
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
    /** Engagement APIs */
    getEngagement: (root: any, args: { _id: Schema.Types.ObjectId }, context: any) => {
      return EngagementModel.findOne({ _id: args._id }).then(engagement => {
        let isSaved = false;
        if (context.user) {
          if (context.user.savedEngagements.indexOf(engagement?._id) !== -1) {
            isSaved = true;
          }
        }
        const copied: any = { ...engagement };
        const updated = copied._doc;
        updated.isSaved = isSaved;
        return updated;
      })
        .catch(err => { return new Error(err) });
    },
    getAllEngagements: (root: any, args: {}, context: any) => {
      return EngagementModel.find()
        .catch(err => { return new Error(err) });
    },
    getEngagements: (
      root: any,
      { startId, perPage }: { startId: Schema.Types.ObjectId, perPage: number },
      context: any,
    ) => {
      const options: any = { status: Constants.STATUS_UNASSIGNED };
      if (startId) {
        options['_id'] = { $lt: startId };
      }
      return EngagementModel.find(options)
        .sort({ _id: -1 })
        .limit(perPage)
        .then(engagements => engagements.map(engagement => {
          let isSaved = false;
          if (context.user) {
            if (context.user.savedEngagements.indexOf(engagement?._id) !== -1) {
              isSaved = true;
            }
          }
          const copied: any = { ...engagement };
          const updated = copied._doc;
          updated.isSaved = isSaved;
          console.log(updated);
          return updated;
        }))
        .catch(err => { return new Error(err) });
    },

    searchEngagements: (root: any, args: { searchString: string }, context: any) => {
      const encapsulatedString = "\"" + args.searchString + "\"";
      return EngagementModel.find({
        $text: {
          $search: encapsulatedString
        }
      })
        .catch(err => { return new Error(err) });
    },
  },
  Mutation: {
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
        return generatedUser;
      } catch (err) {
        return new Error(err);
      }
    },
    logout: async (root: any, args: {}, context: any) => {
      const user = context.user;
      user.token = "";
      try {
        await UserModel.findOneAndUpdate({ _id: user._id }, user, {}).exec();
        return true;
      } catch (err) {
        return new Error(err);
      }
    },
    register: async (root: any, args: { user: IUser }, context: any) => {
      const { name, email, phone, password, skills, role, major,
        gender, year, experience, timetable } = args.user;
      //hashing password
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = {
        name, phone, email, skills, role, major, gender,
        year, experience, timetable,
        profileImage: "",
        password: hashedPassword,
        token: '',
        completedEngagements: [],
        acceptedEngagements: [],
        savedEngagements: []
      };

      // Save to mongodb
      return UserModel.create(user);
    },
    uploadProfileImage: async (root: any, args: { profileImage: string }, context: any) => {
      const { user } = context;
      const update = {
        $set: {
          profileImage: args.profileImage
        }
      }
      if (user) {
        // Save to mongodb
        return UserModel.findOneAndUpdate({ _id: user._id }, update, { new: true });
      }
    },
    /** Engagement APIs */
    createEngagement: (root: any, args: { engagement: IEngagement }, context: any) => {
      const { user } = context;
      if (!user) {
        return new Error("Not Logged In");
      }
      const { engagement } = args;
      engagement.creator = user._id;
      engagement.status = Constants.STATUS_UNASSIGNED;
      return EngagementModel.create(engagement)
        .catch(err => { return new Error(err) });
    },
    updateEngagement: (root: any, args: { engagement: IEngagementDocument }, context: any) => {
      const { engagement } = args;
      return EngagementModel.findOneAndUpdate({ _id: engagement._id }, engagement, { new: true })
        .catch(err => { return new Error(err) });
    },
    deleteEngagement: (root: any, args: { _id: Schema.Types.ObjectId }, context: any) => {
      const _id = args._id;
      return EngagementModel.deleteOne({ _id }, {}).then(res => { return res.deletedCount === 1 })
        .catch(err => { return new Error(err) });
    },
    /** User Engagement APIs */
    acceptEngagement: async (root: any, args: { engagementId: Schema.Types.ObjectId }, context: any) => {
      const { user } = context;
      if (!user) {
        return new Error("Not Logged In");
      }
      const engagement = await EngagementModel.findOneAndUpdate({
        _id: args.engagementId,
        status: Constants.STATUS_UNASSIGNED
      }, {
        $set: {
          status: Constants.STATUS_ACCEPTED
        }
      }).exec();
      if (engagement) {
        return UserModel
          .findOneAndUpdate({ _id: user._id }, { $addToSet: { acceptedEngagements: args.engagementId } },
            { new: true })
          .populate(userPopulateFields);
      } else {
        return new Error("Engagement not available");
      }
    },
    completeEngagement: async (root: any, args: { engagementId: Schema.Types.ObjectId }, context: any) => {
      const { user } = context;
      const engagementId = args.engagementId;
      if (!user) {
        return new Error("Not Logged In");
      }
      const engagement =
        await EngagementModel.findOne({ _id: engagementId, status: Constants.STATUS_ACCEPTED }).exec();

      if (engagement) {
        return UserModel.findOneAndUpdate({
          _id: user._id,
          acceptedEngagements: engagementId
        }, {
          $addToSet: {
            completedEngagements: engagementId
          },
          $pull: {
            acceptedEngagements: engagementId
          }
        }, { new: true }).populate(userPopulateFields)
          .then(async updatedUser => {
            if (updatedUser) {
              await EngagementModel.findOneAndUpdate({ _id: engagementId }, {
                $set: {
                  status: Constants.STATUS_COMPLETED
                }
              }).exec();
            }
            return updatedUser;
          });
      } else {
        return new Error("Engagement not currently accepted");
      }
    },
    saveEngagement: async (root: any, args: { engagementId: Schema.Types.ObjectId }, context: any) => {
      const { user } = context;
      if (!user) {
        return new Error("Not Logged In");
      }
      const engagement = await EngagementModel.findOne({
        _id: args.engagementId,
        status: Constants.STATUS_UNASSIGNED
      }).exec();
      if (engagement) {
        return UserModel
          .findOneAndUpdate({ _id: user._id }, { $addToSet: { savedEngagements: args.engagementId } },
            { new: true })
          .populate(userPopulateFields);
      } else {
        return new Error("Engagement not available");
      }
    },
  }
};

export default resolvers;