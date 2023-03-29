const DBConnection = require('../dbconnection');

describe('Select function', () => {
    var dbConnection = new DBConnection();

    beforeAll(() => {
        jest.spyOn(DBConnection.prototype, 'queryDB').mockImplementation((query) => {
            return new Promise((resolve, reject) => {
                resolve(query);
            })
        });
    });

    test('Without where clause and order by returns correctly', async () => {
        expect.assertions(1);

        await dbConnection.select("*", "swears").then((value) => {
            expect(value).toBe("SELECT * FROM swears");
        });

    });

    test('With only where clause returns correctly', async () => {
        expect.assertions(1);

        await dbConnection.select("*", "swears", "category", "fuck").then((value) => {
            expect(value).toBe("SELECT * FROM swears WHERE category = 'fuck'");
        });
    });

    test('With where and without whereCondition returns correctly', async () => {
        expect.assertions(1);

        await dbConnection.select("*", "swears", "category").then((value) => {
            expect(value).toBe("SELECT * FROM swears");
        });
    });

    test('Both where and order by clauses returned correctly', async () => {
        expect.assertions(1)

        await dbConnection.select("*", "swears", "category", "fuck", "category", "DESC").then((value) => {
            expect(value).toBe("SELECT * FROM swears WHERE category = 'fuck' ORDER BY category DESC");
        });
    });

    test('Where condition is always wrapped in single quotes', async () => {
        expect.assertions(1);

        await dbConnection.select("*", "swears", "category", "fuck").then((value) => {
            expect(value).toBe("SELECT * FROM swears WHERE category = 'fuck'");
        });
    });

    test('SQL injection attack fails', async () => {
        expect.assertions(1);

        await dbConnection.select("*", "swears", "category", ";-- DROP TABLE swears").then((value) => {
            expect(value).toBe("SELECT * FROM swears");
        });
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });
});

describe('SelectGroup function', () => {
    var dbConnection = new DBConnection();

    beforeAll(() => {
        jest.spyOn(DBConnection.prototype, 'queryDB').mockImplementation((query) => {
            return new Promise((resolve, reject) => {
                resolve(query);
            })
        });
    });

    test('All defaults returns correctly', async () => {
        expect.assertions(1);

        await dbConnection.selectGroup("*", "swears", "category").then((value) => {
            expect(value).toBe("SELECT * FROM swears GROUP BY category");
        });
    });

    test('Only where returns defaults', async () => {
        expect.assertions(1);

        await dbConnection.selectGroup("*", "swears", "category", "category").then((value) => {
            expect(value).toBe("SELECT * FROM swears GROUP BY category");
        });
    });

    test('All parameters filled returns correct result', async () => {
        expect.assertions(1);

        await dbConnection.selectGroup("*", "swears", "category", "category", "fuck", "category", true).then((value) => {
            expect(value).toBe("SELECT * FROM swears WHERE category = 'fuck' GROUP BY category ORDER BY category DESC LIMIT 1");
        });
    });

    test('SQL injection attack fails', async () => {
        expect.assertions(1);

        await dbConnection.selectGroup("*", "swears", "category", "category", ";-- DROP TABLE swears", "category", true).then((value) => {
            expect(value).toBe("SELECT * FROM swears GROUP BY category ORDER BY category DESC LIMIT 1");
        });
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });
});

describe('Update function', () => {
    var dbConnection = new DBConnection();

    beforeAll(() => {
        jest.spyOn(DBConnection.prototype, 'queryDB').mockImplementation((query) => {
            return new Promise((resolve, reject) => {
                resolve(query);
            })
        });
    });

    test('All defaults return correctly', async () => {
        expect.assertions(1);

        await dbConnection.update("swears", ["interesting"], ["1"], "id", "1").then((value) => {
            expect(value).toBe("UPDATE swears SET interesting = '1' WHERE id = '1'");
        });
    });

    test('Error occurs when fields and values are different', async () => {
        expect.assertions(1);

        await dbConnection.update("swears", ["interesting"], [], "id", "1")
        .catch((err) => {
            expect(err.message).toBe("The number of fields and values do not match.");
        });
    });

    test('SQL injection attack in update fails', async () => {
        expect.assertions(1);

        await dbConnection.update("swears", ["category"], [";--DROP TABLE swears"], "id", "1").then((value) => {
            expect(value).toBe("UPDATE swears SET  WHERE id = '1'");
        });
    });

    test('SQL injection attack fails', async () => {
        expect.assertions(1);

        await dbConnection.update("swears", ["interesting"], ["1"], "id", ";--DROP TABLE swears").then((value) => {
            expect(value).toBe("UPDATE swears SET interesting = '1' ");
        });
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });
});

describe('Insert function', () => {
    var dbConnection = new DBConnection();

    beforeAll(() => {
        jest.spyOn(DBConnection.prototype, 'queryDB').mockImplementation((query) => {
            return new Promise((resolve, reject) => {
                resolve(query);
            })
        });
    });

    test('All defaults return correctly', async () => {
        expect.assertions(1);

        await dbConnection.insert("swears", ["category", "phrase", "quantity"], ["miscellaneous", "this is a test", "1"]).then((value) => {
            expect(value).toBe("INSERT INTO swears (category, phrase, quantity) VALUES ('miscellaneous', 'this is a test', '1')");
        });
    });

    test('Error occurs when fields and values are different', async () => {
        expect.assertions(1);

        await dbConnection.insert("swears", ["category", "phrase", "quantity"], ["miscellaneous", "this is a test"])
        .catch((err) => {
            expect(err.message).toBe("The number of fields and values do not match.");
        });
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });
});
