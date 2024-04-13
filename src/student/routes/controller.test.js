const {
  getStudents,
  getStudentByUid,
  deleteStudentByUid,
} = require("./controller");
const {
  deleteStudentByUidQuery,
  getStudentsQuery,
  getStudentByUidQuery,
} = require("./../../../database/queries");
const e = require("express");

describe("getStudents", () => {
  it("should return an empty list if no students exist", async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const pool = {
      query: jest.fn().mockResolvedValue({ rows: [] }),
    };
    await getStudents(req, res, pool);
    expect(pool.query).toHaveBeenCalledWith(getStudentsQuery);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([]);
  });

  it("should return a list of students if students exist", async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const pool = {
      query: jest.fn().mockResolvedValue({
        rows: [
          {
            student_uid: "01149f96-4dd3-4cb9-96a1-0a8c67b88186",
            first_name: "Tom",
            last_name: "Ford",
            gender: null,
            email: "tom@gmail.com",
            date_of_birth: "1988-12-30T06:00:00.000Z",
          },
          {
            student_uid: "78507875-56fc-42d9-9379-d376013edd9",
            first_name: "Samantha",
            last_name: "Thomson",
            gender: "Female",
            email: "samanthathomson@gmail.com",
            date_of_birth: "1979-05-04T06:00:00.000Z",
          },
        ],
      }),
    };
    await getStudents(req, res, pool);
    expect(pool.query).toHaveBeenCalledWith(getStudentsQuery);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      {
        student_uid: "01149f96-4dd3-4cb9-96a1-0a8c67b88186",
        first_name: "Tom",
        last_name: "Ford",
        gender: null,
        email: "tom@gmail.com",
        date_of_birth: "1988-12-30T06:00:00.000Z",
      },
      {
        student_uid: "78507875-56fc-42d9-9379-d376013edd9",
        first_name: "Samantha",
        last_name: "Thomson",
        gender: "Female",
        email: "samanthathomson@gmail.com",
        date_of_birth: "1979-05-04T06:00:00.000Z",
      },
    ]);
  });

  it("should return a 500 error if an internal server error occurs", async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const pool = {
      query: jest.fn().mockRejectedValue(new Error("Database error")),
    };
    await getStudents(req, res, pool);
    expect(pool.query).toHaveBeenCalledWith(getStudentsQuery);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ message: "Internal Server Error" });
  });
});

describe("getStudentByUid", () => {
  const studentUid = "03279879-c371-4102-8334-8bebe3617b9e";
  it("should return a student if the student exists", async () => {
    const req = {
      params: {
        uid: studentUid,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const pool = {
      query: jest.fn().mockResolvedValue({
        rows: [
          {
            student_uid: "03279879-c371-4102-8334-8bebe3617b9e",
            first_name: "Samantha",
            last_name: "Thomson",
            gender: "Female",
            email: "samanthathomson@gmail.com",
            date_of_birth: "1979-05-04T06:00:00.000Z"
          },
        ],
      }),
    };
    await getStudentByUid(req, res, pool);
    expect(pool.query).toHaveBeenCalledWith(getStudentByUidQuery, [studentUid]);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      student_uid: "03279879-c371-4102-8334-8bebe3617b9e",
      first_name: "Samantha",
      last_name: "Thomson",
      gender: "Female",
      email: "samanthathomson@gmail.com",
      date_of_birth: "1979-05-04T06:00:00.000Z"
    });
  });
  it("should return a 404 error if student is not found", async () => {
    const req = {
      params: {
        uid: studentUid,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const pool = {
      query: jest.fn().mockResolvedValue({ rows: [] }),
    };
    await getStudentByUid(req, res, pool);
    expect(pool.query).toHaveBeenCalledWith(getStudentByUidQuery, [studentUid]);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({ message: "Student not found" });
  });
  it("should return a 500 error if an internal server error occurs", async () => { 
    const req = {
      params: {
        uid: studentUid,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const pool = {
      query: jest.fn().mockRejectedValue(new Error("Database error")),
    };
    await getStudentByUid(req, res, pool);
    expect(pool.query).toHaveBeenCalledWith(getStudentByUidQuery, [studentUid]);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ message: "Internal Server Error" });
  });
});

describe("deleteStudentByUid", () => {
  const studentUid = "03279879-c371-4102-8334-8bebe3617b9e";

  it("should delete a student and return success message", async () => {
    const req = {
      params: {
        uid: studentUid,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Mock the pool.query function to return a non-empty rows array
    const pool = {
      query: jest.fn().mockResolvedValue({
        rows: [{ student_uid: studentUid }],
      }),
    };

    await deleteStudentByUid(req, res, pool);

    expect(pool.query).toHaveBeenCalledWith(deleteStudentByUidQuery, [
      studentUid,
    ]);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(
      `Student deleted with UID: ${studentUid}`
    );
  });

  it("should return a 404 error if student is not found", async () => {
    const req = {
      params: {
        uid: studentUid,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Mock the pool.query function to return an empty rows array
    const pool = {
      query: jest.fn().mockResolvedValue({ rows: [] }),
    };

    await deleteStudentByUid(req, res, pool);

    expect(pool.query).toHaveBeenCalledWith(deleteStudentByUidQuery, [
      studentUid,
    ]);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({ message: "Student not found" });
  });

  it("should return a 500 error if an internal server error occurs", async () => {
    const partialStudentUid = "03279879-c371-4102-8334-8bebe36";
    const req = {
      params: {
        uid: partialStudentUid,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Mock the pool.query function to throw an error
    const pool = {
      query: jest.fn().mockRejectedValue(new Error("Database error")),
    };

    await deleteStudentByUid(req, res, pool);

    expect(pool.query).toHaveBeenCalledWith(deleteStudentByUidQuery, [
      partialStudentUid,
    ]);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      message: "Internal Server Error",
    });
  });
});
