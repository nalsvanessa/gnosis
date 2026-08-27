INSERT INTO challenges (title, description, category, created_at, reflection, completed, completed_at)
SELECT
    'Talk to stranger',
    'On your commute to and from work, try to have a conversation with a stranger.',
    'Social',
    '2023-01-01',
    'It was a lot more easier to strike up conversation then i thought.',
    TRUE,
    NULL
WHERE NOT EXISTS (
    SELECT title
    FROM challenges
    WHERE title = 'Talk to stranger'
);

INSERT INTO challenges (title, description, category, created_at, reflection, completed, completed_at)
SELECT
    'Try a new food',
    'Visit a restaurant or food market and try something you have never eaten before.',
    'Adventure',
    '2023-01-05',
    'I enjoyed trying something new and would definitely do it again.',
    TRUE,
    '2023-01-06'
WHERE NOT EXISTS (
    SELECT title
    FROM challenges
    WHERE title = 'Try a new food'
);

INSERT INTO challenges (title, description, category, created_at, reflection, completed, completed_at)
SELECT
    'Take a different route',
    'Take a different route when travelling somewhere familiar.',
    'Adventure',
    '2023-01-10',
    NULL,
    FALSE,
    NULL
WHERE NOT EXISTS (
    SELECT title
    FROM challenges
    WHERE title = 'Take a different route'
);

INSERT INTO challenges (title, description, category, created_at, reflection, completed, completed_at)
SELECT
    'Give someone a compliment',
    'Give a genuine compliment to someone you interact with during the day.',
    'Social',
    '2023-01-15',
    'It felt good to make someone smile.',
    TRUE,
    '2023-01-15'
WHERE NOT EXISTS (
    SELECT title
    FROM challenges
    WHERE title = 'Give someone a compliment'
);

INSERT INTO challenges (title, description, category, created_at, reflection, completed, completed_at)
SELECT
    'Go somewhere alone',
    'Visit a cafe, restaurant, museum or other place by yourself.',
    'Confidence',
    '2023-01-20',
    NULL,
    FALSE,
    NULL
WHERE NOT EXISTS (
    SELECT title
    FROM challenges
    WHERE title = 'Go somewhere alone'
);

INSERT INTO challenges (title, description, category, created_at, reflection, completed, completed_at)
SELECT
    'Try a new workout',
    'Try a type of exercise or workout that you have never done before.',
    'Fitness',
    '2023-02-01',
    'The workout was harder than expected but I felt great afterwards.',
    TRUE,
    '2023-02-02'
WHERE NOT EXISTS (
    SELECT title
    FROM challenges
    WHERE title = 'Try a new workout'
);

INSERT INTO challenges (title, description, category, created_at, reflection, completed, completed_at)
SELECT
    'Speak up in a group',
    'Share your opinion or contribute an idea during a group conversation.',
    'Confidence',
    '2023-02-10',
    'I was nervous at first but realised that people were interested in what I had to say.',
    TRUE,
    '2023-02-10'
WHERE NOT EXISTS (
    SELECT title
    FROM challenges
    WHERE title = 'Speak up in a group'
);

INSERT INTO challenges (title, description, category, created_at, reflection, completed, completed_at)
SELECT
    'Visit a new place',
    'Explore a place in your local area that you have never visited before.',
    'Exploration',
    '2023-02-15',
    NULL,
    FALSE,
    NULL
WHERE NOT EXISTS (
    SELECT title
    FROM challenges
    WHERE title = 'Visit a new place'
);

INSERT INTO challenges (title, description, category, created_at, reflection, completed, completed_at)
SELECT
    'Start a conversation',
    'Start a conversation with someone you normally would not speak to.',
    'Social',
    '2023-02-20',
    'Starting the conversation was easier than I expected.',
    TRUE,
    '2023-02-20'
WHERE NOT EXISTS (
    SELECT title
    FROM challenges
    WHERE title = 'Start a conversation'
);

INSERT INTO challenges (title, description, category, created_at, reflection, completed, completed_at)
SELECT
    'Do something spontaneous',
    'Say yes to an unexpected opportunity or make a spontaneous plan.',
    'Adventure',
    '2023-03-01',
    NULL,
    FALSE,
    NULL
WHERE NOT EXISTS (
    SELECT title
    FROM challenges
    WHERE title = 'Do something spontaneous'
);