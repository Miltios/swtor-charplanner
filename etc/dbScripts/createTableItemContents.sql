CREATE TABLE swtor.ItemContents (
    ItemId INT NOT NULL,
    ItemModId INT NOT NULL,
    FOREIGN KEY (ItemId) REFERENCES swtor.Items(ItemId),
    FOREIGN KEY (ItemModId) REFERENCES swtor.ItemMods(ItemId),
    PRIMARY KEY (ItemId, ItemModId)
)