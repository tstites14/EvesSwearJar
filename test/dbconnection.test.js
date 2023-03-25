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

/*
describe('Delete function', () => {
    test('Returned query is valid', async () => {
        
    })
});

describe('Update function', () => {
    test('Returned query is valid', async () => {
        
    })
});

describe('Insert function', () => {
    test('Returned query is valid', async () => {
        
    })
});
*/