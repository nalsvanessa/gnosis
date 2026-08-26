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
    SELECT 1
    FROM challenges
    WHERE title = 'Talk to stranger'
);