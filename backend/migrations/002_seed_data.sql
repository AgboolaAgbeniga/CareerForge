-- Seed data for development and testing environments
-- Run this after the initial schema migration

-- Insert sample companies
INSERT INTO companies (name, industry, headquarters, size, description, website_url) VALUES
('TechCorp Nigeria', 'Technology', 'Lagos, Nigeria', '51-200', 'Leading technology company in Nigeria', 'https://techcorp.ng'),
('Global Solutions Ltd', 'Consulting', 'Abuja, Nigeria', '201-500', 'Business consulting and IT solutions', 'https://globalsolutions.ng'),
('InnovateHub', 'Software Development', 'Lagos, Nigeria', '11-50', 'Agile software development company', 'https://innovatehub.ng');

-- Insert sample users (passwords are hashed 'password123')
INSERT INTO users (email, password_hash, role, first_name, last_name, phone, location, is_verified) VALUES
('john.doe@example.com', '$2b$10$8K3L2N3P4Q5R6S7T8U9V0W1X2Y3Z4A5B6C7D8E9F0G1H2I3J4K5L', 'job_seeker', 'John', 'Doe', '+2348012345678', 'Lagos, Nigeria', true),
('jane.smith@example.com', '$2b$10$8K3L2N3P4Q5R6S7T8U9V0W1X2Y3Z4A5B6C7D8E9F0G1H2I3J4K5L', 'job_seeker', 'Jane', 'Smith', '+2348012345679', 'Abuja, Nigeria', true),
('recruiter@techcorp.ng', '$2b$10$8K3L2N3P4Q5R6S7T8U9V0W1X2Y3Z4A5B6C7D8E9F0G1H2I3J4K5L', 'recruiter', 'Michael', 'Johnson', '+2348012345680', 'Lagos, Nigeria', true),
('hr@globalsolutions.ng', '$2b$10$8K3L2N3P4Q5R6S7T8U9V0W1X2Y3Z4A5B6C7D8E9F0G1H2I3J4K5L', 'recruiter', 'Sarah', 'Williams', '+2348012345681', 'Abuja, Nigeria', true);

-- Insert job seeker profiles
INSERT INTO job_seekers (id, title, experience_years, skills, education, profile_completion_percentage) VALUES
((SELECT id FROM users WHERE email = 'john.doe@example.com'), 'Software Developer', 3, ARRAY['JavaScript', 'React', 'Node.js', 'Python'], 'Bachelor of Computer Science, University of Lagos', 85),
((SELECT id FROM users WHERE email = 'jane.smith@example.com'), 'Data Analyst', 2, ARRAY['Python', 'SQL', 'Tableau', 'Excel'], 'Master of Statistics, Ahmadu Bello University', 78);

-- Insert recruiter profiles
INSERT INTO recruiters (id, company_name, industry, company_size, title, experience_years, specialization, subscription_plan) VALUES
((SELECT id FROM users WHERE email = 'recruiter@techcorp.ng'), 'TechCorp Nigeria', 'Technology', '51-200', 'Senior Recruiter', 5, 'Software Engineering', 'premium'),
((SELECT id FROM users WHERE email = 'hr@globalsolutions.ng'), 'Global Solutions Ltd', 'Consulting', '201-500', 'HR Manager', 8, 'Business Analysis', 'premium');

-- Insert sample jobs
INSERT INTO jobs (recruiter_id, company_id, title, description, requirements, location, salary_min, salary_max, currency, job_type, experience_level, skills_required, status) VALUES
((SELECT id FROM users WHERE email = 'recruiter@techcorp.ng'), (SELECT id FROM companies WHERE name = 'TechCorp Nigeria'), 'Senior Frontend Developer', 'We are looking for an experienced Frontend Developer to join our team and help build amazing user experiences.', '3+ years of experience with React, JavaScript, CSS, HTML. Experience with TypeScript is a plus.', 'Lagos, Nigeria', 300000, 500000, 'NGN', 'full_time', 'mid', ARRAY['React', 'JavaScript', 'TypeScript', 'CSS'], 'open'),
((SELECT id FROM users WHERE email = 'recruiter@techcorp.ng'), (SELECT id FROM companies WHERE name = 'TechCorp Nigeria'), 'Backend Engineer', 'Join our backend team to develop scalable APIs and microservices.', 'Strong experience with Node.js, Python, or Java. Knowledge of databases and cloud platforms.', 'Lagos, Nigeria', 350000, 600000, 'NGN', 'full_time', 'mid', ARRAY['Node.js', 'Python', 'PostgreSQL', 'AWS'], 'open'),
((SELECT id FROM users WHERE email = 'hr@globalsolutions.ng'), (SELECT id FROM companies WHERE name = 'Global Solutions Ltd'), 'Business Analyst', 'Analyze business requirements and provide data-driven insights.', '2+ years in business analysis, SQL, Excel. Experience with BI tools preferred.', 'Abuja, Nigeria', 250000, 400000, 'NGN', 'full_time', 'mid', ARRAY['SQL', 'Excel', 'Tableau', 'Business Analysis'], 'open');

-- Insert sample applications
INSERT INTO applications (job_seeker_id, job_id, status, applied_at, match_score, cover_letter) VALUES
((SELECT id FROM users WHERE email = 'john.doe@example.com'), (SELECT id FROM jobs WHERE title = 'Senior Frontend Developer'), 'pending', NOW(), 0.85, 'I am excited to apply for the Senior Frontend Developer position. With 3 years of experience in React and JavaScript, I am confident I can contribute to your team.'),
((SELECT id FROM users WHERE email = 'jane.smith@example.com'), (SELECT id FROM jobs WHERE title = 'Business Analyst'), 'reviewing', NOW(), 0.78, 'I am interested in the Business Analyst role and believe my data analysis skills would be valuable to your team.');

-- Insert sample messages
INSERT INTO messages (sender_id, recipient_id, application_id, subject, content, message_type) VALUES
((SELECT id FROM users WHERE email = 'john.doe@example.com'), (SELECT id FROM users WHERE email = 'recruiter@techcorp.ng'), (SELECT id FROM applications WHERE job_seeker_id = (SELECT id FROM users WHERE email = 'john.doe@example.com') LIMIT 1), 'Application Follow-up', 'Thank you for considering my application. I am very interested in this opportunity.', 'application'),
((SELECT id FROM users WHERE email = 'recruiter@techcorp.ng'), (SELECT id FROM users WHERE email = 'john.doe@example.com'), (SELECT id FROM applications WHERE job_seeker_id = (SELECT id FROM users WHERE email = 'john.doe@example.com') LIMIT 1), 'Application Received', 'Thank you for your application. We will review it and get back to you soon.', 'application');

-- Insert sample notifications
INSERT INTO notifications (user_id, type, title, content, data) VALUES
((SELECT id FROM users WHERE email = 'john.doe@example.com'), 'application_update', 'Application Status Update', 'Your application for Senior Frontend Developer has been received.', '{"job_id": 1, "status": "pending"}'),
((SELECT id FROM users WHERE email = 'jane.smith@example.com'), 'job_match', 'New Job Match', 'We found a job that matches your profile!', '{"job_id": 3, "match_score": 0.78}');

-- Insert sample analytics events
INSERT INTO analytics_events (user_id, event_type, event_data, session_id, ip_address) VALUES
((SELECT id FROM users WHERE email = 'john.doe@example.com'), 'job_search', '{"keywords": "frontend developer", "location": "Lagos"}', 'session_123', '127.0.0.1'),
((SELECT id FROM users WHERE email = 'jane.smith@example.com'), 'profile_view', '{"profile_completion": 78}', 'session_456', '127.0.0.1');

-- Insert sample experiments
INSERT INTO experiments (name, description, status, variants, target_audience, start_date, end_date) VALUES
('Resume Optimization A/B Test', 'Testing different resume optimization suggestions', 'running', '["version_a", "version_b"]', '{"role": "job_seeker", "experience_years": {"$lt": 5}}', NOW(), NOW() + INTERVAL '30 days');

-- Insert sample experiment participants
INSERT INTO experiment_participants (experiment_id, user_id, variant_assigned) VALUES
((SELECT id FROM experiments LIMIT 1), (SELECT id FROM users WHERE email = 'john.doe@example.com'), 'version_a'),
((SELECT id FROM experiments LIMIT 1), (SELECT id FROM users WHERE email = 'jane.smith@example.com'), 'version_b');