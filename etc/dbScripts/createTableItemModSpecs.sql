CREATE TABLE swtor.ItemModSpecs (
    ItemId INT NOT NULL,
    Spec VARCHAR(32) NOT NULL,
    FOREIGN KEY (ItemId) REFERENCES swtor.ItemMods(ItemId),
    PRIMARY KEY (ItemId, Spec)
)