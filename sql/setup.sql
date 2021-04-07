DROP TABLE IF EXISTS hormones;

CREATE TABLE hormones (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    hormone TEXT NOT NULL,
    source_organ TEXT NOT NULL,
    target_organ TEXT NOT NULL,
    physiological_action TEXT NOT NULL,
    structure TEXT NOT NULL
);
