CREATE TABLE swtor.ItemMods (
    ItemId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(128),
    Slot VARCHAR(32),
    Rating INT,
    Color VARCHAR(32),
    Disabled TINYINT(1), -- MySQL version of a boolean.  Added this column so we can nix items that are broken or incomplete without rooting them out of every linked table.
    Image VARCHAR(128)
)