import pool from '../Database/config';
import db from '../Database/index';
import bcrypt from 'bcrypt';

// ? Register Student Information
export const studController = async (req, res) => {
  try {
    const connection = await db.poolConnect(pool);

    try {
      const { id, name, standard, email, phone, passcode, address, stud_sub, stud_attendance } = req.body;

      // ? authenticatee
      const salt = await bcrypt.genSalt(10);

      const myPassword = await bcrypt.hash(passcode, salt);
      // ? hashing password

      const studRegister = await db.insertOne(connection, {
        table_name: 'student',
        data: {
          id,
          name,
          standard,
          email,
          phone,
          passcode: myPassword,
          address,
          stud_sub,
          stud_attendance,
          attendance_id: 2
        }
      });

      return res.status(201).json({
        result: true,
        message: 'Thank you for Registering student websitee... 😍😍',
        data: {
          id: studRegister.insertId,
          ...req.body
        }
      });
    } finally {
      connection.release();
    }
  } catch (err) {
    return errorHandleMangeer(err, res);
  }
};

// ? Login api
export const studLoginController = async (req, res) => {
  try {
    const connection = await db.poolConnect(pool);
    try {
      const { email, passcode } = req.body;

      if (!email || !passcode || (!email && !passcode)) {
        return res.status(401).json('Invalid request Please try again');
      }

      const students = await db.getOne(connection, {
        table_name: 'student ',
        projection: ' email, passcode',
        condition: `email = ? `,
        value: [email]
      });

      if (!students.length) return res.status(401).json('Invalid Email');
      // console.log(students); // show students email & passcode
      const is_correct = await bcrypt.compare(passcode, students[0].passcode);
      //console.log(is_correct); // verify students passcode and return true or false

      if (!is_correct) {
        return res.status(401).json('wrong password');
      }
      return res.status(200).json({
        result: true,
        message: 'login successfull...',
        data: {
          users: students
        }
      });
    } finally {
      connection.release();
    }
  } catch (err) {
    return errorHandleMangeer(err, res);
  }
};
