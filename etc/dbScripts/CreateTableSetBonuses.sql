CREATE TABLE swtor.SetBonuses (
    SetId VARCHAR(32) NOT NULL PRIMARY KEY,
    SetName VARCHAR(128),
    SetClass VARCHAR(32),
    Bonus2Stat VARCHAR(32),
    Bonus2Value DOUBLE(5,3),
    Bonus2Desc VARCHAR(1024),
    Bonus4Stat VARCHAR(32),
    Bonus4Value DOUBLE(5,3),
    Bonus4Desc VARCHAR(1024),
    Bonus6Stat VARCHAR(32),
    Bonus6Value DOUBLE(5,3),
    Bonus6Desc VARCHAR(1024),
    Role VARCHAR(32)
);

--NOTE: MySQL import does not handle null values in DOUBLE columns (known bug).  All double fields must have 0 in place of null, even though null would work fine with this table structure once it's actually imported.