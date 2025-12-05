// import { Request, Response } from "express";
// import { userSerice } from "./user.service";

// // create user
// const createUser = async (req: Request, res: Response) => {
//   try {
//     // name, email, password , phone , role
//     const result = await userSerice.createUser(req.body);
//     res.status(201).json({
//       success: true,
//       message: "User Created Successfully",
//       data: result.rows[0],
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//       error: error.message,
//     });
//   }
// };

// // get all user

// // const getAllUser = async (req: Request, res: Response) => {
// //   try {
// //     const result = await pool.query(
// //       `INSERT INTO users (name, email, password)
// //        VALUES ($1, $2, $3)
// //        RETURNING *`,
// //       [name, email.toLowerCase(), password]
// //     );

// //     res.status(200).json({
// //       success: true,
// //       message: "Users get Successfully",
// //       data: result.rows[0],
// //     });
// //   } catch (error: any) {
// //     res.status(500).json({
// //       success: false,
// //       message: "Something went wrong",
// //       error: error.message,
// //     });
// //   }
// // };
// export const userController = {
//   createUser,
//   // getAllUser,
// };
