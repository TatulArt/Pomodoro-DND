CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL 
    might INT,
    dexterity INT, 
    versatality INT,
    intellect INT,
    wisdom INT,
    craft INT,
    level_exp INT,
    exp INT,
    task_per_day INT,
    task_all_time INT,
    achievements_number INT,
    exp_per_day INT,
    time_per_day INT,
    might_per_day INT,
    dexterity_per_day INT,
    versatality_per_day INT, 
    intellect_per_day INT, 
    wisdom_per_day INT,
    craft_per_day INT,
    time_all INT,
    declined_tasks INT
);

CREATE TABLE achievements (
    achievement_name VARCHAR(255) NOT NULL,
    achievement_id VARCHAR(255) NOT NULL,
    achievement_description TEXT, 
    achievement_exp_gain INT,
    achievement_completion_status BOOLEAN, 
    progress FLOAT,
    cooldown_time TIMESTAMP,
    achievement_might_requirement INT,
    achievement_dexterity_requirement INT,
    achievement_versatality_requirement INT,
    achievement_intellect_requirement INT,
    achievement_wisdom_requirement INT,
    achievement_craft_requirement INT
);

CREATE TABLE tasks (
    task_name VARCHAR(255),
    task_id VARCHAR(255),
    task_completion_status BOOLEAN, 
    completion_time TIMESTAMP,
    task_exp_gain INT,
    task_might_gain INT, 
    task_dexterity_gain INT, 
    task_versatality_gain INT,
    task_intellect_gain INT,
    task_wisdom_gain INT,
    task_craft_gain INT
);
