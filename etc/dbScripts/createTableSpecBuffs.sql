CREATE TABLE swtor.SpecBuffs (
    RowId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Spec VARCHAR(32) NOT NULL,
    Stat VARCHAR(32) NOT NULL,
    StatValue DOUBLE(5,3),
    Passive VARCHAR(128),
    Disabled TINYINT(1), -- MySQL version of a boolean.  Added this column so we can nix items that are broken or incomplete without rooting them out of every linked table.
    FOREIGN KEY (Spec) REFERENCES swtor.Specs(Spec)
);