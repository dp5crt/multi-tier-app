CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL CHECK (char_length(trim(title)) > 0),
    completed BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_todos_created_at ON todos (created_at DESC);

INSERT INTO todos (title, completed)
VALUES ('Learn Docker', FALSE), ('Build ToDo App', TRUE)
ON CONFLICT DO NOTHING;