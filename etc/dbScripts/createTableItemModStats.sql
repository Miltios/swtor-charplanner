CREATE TABLE swtor.ItemModStats (
    ItemId INT NOT NULL,
    StatName VARCHAR(32) NOT NULL,
    StatValue INT,
    FOREIGN KEY (ItemId) REFERENCES swtor.Items(ItemId),
    PRIMARY KEY (ItemId, StatName)
)