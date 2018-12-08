CREATE TABLE swtor.ItemSpecs (
    ItemId INT NOT NULL,
    Spec VARCHAR(32) NOT NULL,
    FOREIGN KEY (ItemId) REFERENCES swtor.Items(ItemId),
    PRIMARY KEY (ItemId, Spec)
)