import { CreateUserData } from "../interface/UserInterface";
import { UserModel } from "../model/userModel";

export const getUsersAction = () => {
    const response = UserModel.find();
    return response;
};

export const getUserByEmail = (email: string) => {
    const response = UserModel.findOne({ email });
    return response;
};

export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    'authentication.sessionToken': sessionToken,
});

export const getUserByIdAction = (id: string) => {
    const response = UserModel.findById(id);
    return response;
};

export const createUser = (values: CreateUserData) => new UserModel(values).save().then((user) => user.toObject());

export const deleteUserByIdAction = (id: string) => UserModel.findOneAndDelete({ _id: id });

export const updateUserByIdAction = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);
