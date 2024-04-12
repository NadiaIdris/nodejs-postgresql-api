const { deleteStudentByUid } = require("./controller");
const { deleteStudentByUidQuery } = require("./../../../database/queries");

describe("deleteStudentByUid", () => {
  const studentUid = "03279879-c371-4102-8334-8bebe3617b9e";

  it("should delete a student and return success message", async () => {
    const studentUid = "03279879-c371-4102-8334-8bebe3617b9e";
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
    expect(res.send).toHaveBeenCalledWith({ message: "Internal Server Error" });
  });
});
