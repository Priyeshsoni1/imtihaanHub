import { toast, Toaster } from "react-hot-toast";
import { v4 } from "uuid";

export const createAuthSlice = (set, get) => ({
  users: [],
  authUser: null,

  setUsers: (users) => {
    set(() => ({
      users,
    }));
  },

  createUser: (payload, onSuccess, onError) => {
    console.log("createUser payload", onSuccess);
    const { users } = get();

    const targetUser = users.find(
      (u) => u.email.toLowerCase() === payload.email.toLowerCase()
    );
    console.log("createUser payload", targetUser, users, payload);
    if (targetUser) {
      toast.error(
        `User with email ${targetUser.email} exist, please login or use another email.`
      );
      return;
    }

    try {
      const userToAdd = {
        id: v4(),
        ...payload,
      };

      set(() => ({
        users: [userToAdd, ...users],
        authUser: userToAdd,
      }));

      toast.success("Welcome, you are registered successfully!");
      typeof onSuccess === "function" && onSuccess(userToAdd);
    } catch (error) {
      typeof onError === "function" && onError(error);
      toast.error("There is issue in registering!");
    }
  },

  setAuthUser: (payload) => {
    set(() => ({
      authUser: payload,
    }));
  },

  login: (payload, onSuccess, onError) => {
    const { users } = get();

    try {
      const foundUser = users.find(
        (u) =>
          u.email.toLowerCase() === payload.email.toLowerCase() &&
          u.password === payload.password
      );

      if (foundUser) {
        set(() => ({
          authUser: foundUser,
        }));

        typeof onSuccess === "function" && onSuccess(foundUser);
        toast.success(`Welcome back, ${foundUser.email}`);
      } else {
        toast.error("Invalid email/password.");
        typeof onError === "function" && onError("");
      }
    } catch (error) {
      typeof onError === "function" && onError(error);
    }
  },

  logout: () => {
    set(() => ({
      authUser: null,
      quiz: [],
      users: [],
      questionBank: [],
    }));
    toast.success("Logged out successfully!");
  },
});
