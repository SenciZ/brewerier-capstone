CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_first_name VARCHAR(50),
    user_last_name VARCHAR(50),
    user_username VARCHAR(50),
    user_email VARCHAR(80),
    user_crypted_password VARCHAR(500)
);

CREATE TABLE user_brewerylist(
user_id SERIAL PRIMARY KEY references users(user_id),
brewery_id INTEGER,
brewery_visited BOOLEAN
);