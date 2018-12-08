CREATE TABLE swtor.ItemMods (
    ItemId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(128),
    Slot VARCHAR(32),
    Rating INT,
    Color VARCHAR(32)
)