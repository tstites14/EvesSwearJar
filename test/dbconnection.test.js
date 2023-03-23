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

    test('Select without where clause and order by returns correctly', async () => {
        expect.assertions(1);

        await dbConnection.select("*", "swears").then((value) => {
            expect(value).toBe("SELECT * FROM swears");
        });

    });

    test('Select with only where clause returns correctly', async () => {
        expect.assertions(1);

        await dbConnection.select("*", "swears", "category", "'fuck'").then((value) => {
            expect(value).toBe("SELECT * FROM swears WHERE category = 'fuck'");
        });
    });

    test('Select with where and without whereCondition returns correctly', async () => {
        expect.assertions(1);

        await dbConnection.select("*", "swears", "category").then((value) => {
            expect(value).toBe("SELECT * FROM swears");
        });
    });

    test('Select with both where and order by clauses returned correctly', async () => {
        expect.assertions(1)

        await dbConnection.select("*", "swears", "category", "'fuck'", "category", "DESC").then((value) => {
            expect(value).toBe("SELECT * FROM swears WHERE category = 'fuck' ORDER BY category DESC");
        });
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });
});
/*
describe('SelectGroup function', () => {
    test('Returned query is valid', async () => {
        
    })
});


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