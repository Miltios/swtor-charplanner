CREATE TABLE swtor.RatingStats (
    Rating INT NOT NULL,
    LightPri INT NOT NULL,
    LightSec INT NOT NULL,
    MediumPri INT NOT NULL,
    MediumSec INT NOT NULL,
    HeavyPri INT NOT NULL,
    HeavySec INT NOT NULL,
    FOREIGN KEY (Rating) REFERENCES swtor.Items(Rating),
    PRIMARY KEY (Rating)
)