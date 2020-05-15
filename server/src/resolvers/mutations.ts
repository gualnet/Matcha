import User from '../database/User'

const login = async (parent: any, args: any, context: any, info: any) => {
  console.log("\n===LOGIN===")
  // create token / toogle connection status
  const UserFound = await User.findOneAndUpdate({
      login: args.login,
      password: args.password,
    }, {
      token: "newToken",
      connected: true
    },{
      new: true
    });
  console.log("UserFound2:\n ", UserFound)
  return UserFound
};

const logout = async (parent: any, args: any, context: any, info: any) => {
  console.log("\n===LOGOUT===")

  const whereOptions = args.token ? {token: args.token} : {_id: args.id}
  // reset token / toogle connection status
  const UserFound = await User.findOneAndUpdate(
    whereOptions,{
      token: "",
      connected: false
    }, {
      new: true
    });
  console.log("UserFound2:\n ", UserFound)
  return UserFound
};

export default {
  login,
  logout,
}