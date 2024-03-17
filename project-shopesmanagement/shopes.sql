-- Drop table if it exists
-- DROP database if exist 
DROP TABLE IF EXISTS `shopes`;
-- Create table
CREATE TABLE `shopes` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(200),
    `location` VARCHAR(500),
    `contact_number` VARCHAR(100),
    `opening_hours` VARCHAR(50) DEFAULT '11 AM-9 PM', -- Default opening hours
    `on_maps` VARCHAR(200),
    `website` VARCHAR(100),
    `rating` FLOAT
);

-- Insert data
INSERT INTO `shopes` (`name`, `location`, `contact_number`, `on_maps`, `website`, `rating`)
VALUES 
    ('Zudio - Abids, Hyderabad', 'Khan Lateef Khan Estate, 5-8-62, LB Stadium Rd, Fateh Maidan, Abids, Hyderabad, Telangana 500001', '08657489794', 'https://maps.app.goo.gl/QpMv3BifWsjY725C9', 'https://www.zudio.com/', 4.1),
    ('ZUDIO - Irrum Manzil Mall, Hyderabad', 'Ward No.85, &, Block No. E, TS Nos.3/1 In, Mandal, Khairtabad, Hyderabad, Telangana 500004', '08657489808', 'https://maps.app.goo.gl/tbJN3YLjXdUEDbTV8', 'https://www.zudio.com/', 4.2),
    ('Zudio', 'Road No. 14, BNR Colony, Venkat Nagar, Banjara Hills, Hyderabad, Telangana 500034', '07275855990', 'https://maps.app.goo.gl/6bk7irbhdt1XxMsB9', 'https://www.zudio.com/', 4.2),
    ('ZUDIO - Hyderabad, Kukatpally- II', 'metro station, Service Rd, near Kukatpally - Jagathgiri Gutta Road, Bagh Ameer, Sumitra Nagar Colony, Kukatpally, Hyderabad, Telangana 500072', '07275855990', 'https://maps.app.goo.gl/f4kPFo8q3xLEYjTz9', 'https://www.zudio.com/', 4.2),
    ('Zudio - VSN Mall, Vijaywada', 'Ground & 1st floor, Panpana, Siddhartha Nagar, Benz Circle, Vijayawada, Andhra Pradesh 520008', '08657540368', 'https://maps.app.goo.gl/SmX678V5P44LETc97', 'https://www.zudio.com/', 4.2),
    ('Zudio', '203, Venu Regency Plaza, Waltair Main Rd, Ram Nagar, Visakhapatnam, Andhra Pradesh 530002', '-', 'https://maps.app.goo.gl/EgJjcToRP3owMa7V8', 'https://www.zudio.com/', 4.1),
    ('Zudio', 'R2GP+J5H, River View Colony, Kurnool, Andhra Pradesh 518004', '-', 'https://maps.app.goo.gl/bG5JiWZHCFVD7uYr6', 'https://www.zudio.com/', 4.1),
    ('ZUDIO - New Delhi, Mahavir Enclave', 'H-2/2, 7 A, Vaishali Colony, Mahavir Enclave, New Delhi, Delhi, 110045', '07400440465', 'https://maps.app.goo.gl/9LLSaHQEGUz1J3QbA', 'https://www.zudio.com/', 5.0),
    ('Zudio, Janakpuri (West)', 'J39H+JJQ, Mata Chanan Devi Hospital, Block C1, Janakpuri, Delhi', '08800838750', 'https://maps.app.goo.gl/S6zGmrM3D1wVnTCr7', 'https://www.zudio.com/', 3.9),
    ('Zudio - Miraya Rose, Bengaluru', 'Hobli, Palm Meadows, Siddapura, Whitefield, Varthur, Bengaluru, Karnataka 560066', '08657540805', 'https://maps.app.goo.gl/ehbVbAFwLQdFoCki8', 'https://www.zudio.com/', 4.2),
    ('ZUDIO - Mangalore, Manipal', 'Asif’s Association, near Hotel Attill, Manipal-Udupi Hwy, beside Indian Nursery, Manipal, Karnataka 576104', '08976732837', 'https://maps.app.goo.gl/Z7sCv84QbqmewoaT8', 'https://www.zudio.com/', 4.2),
    ('Zudio - Jayanagar, Bengaluru', '230 (Old No, 17, 9th Main Rd, Jaya Nagar 1st Block, Jayanagar 3rd Block, Jayanagar, Bengaluru, Karnataka 560011', '08655912167', 'https://maps.app.goo.gl/Gy3WtEVs53fFKYTg7', 'https://www.zudio.com/', 4.0),
    ('ZUDIO', 'JQ4V+PQ5, Keshav Park, Mhow Bypass Rd, Indore, Madhya Pradesh 453331', '07275855990', 'https://maps.app.goo.gl/sKf4Q9hR3rV2GN457', 'https://www.zudio.com/', 4.1),
    ('Zudio Hoshangabad - Bhopal, Madhya Pradesh', 'Hoshangabad, Misrod, Bhopal, Madhya Pradesh 462004', '08657489815', 'https://maps.app.goo.gl/eeG8on4JHAiS3CQZ6', 'https://www.zudio.com/', 4.2),
    ('Zudio - Phoenix Market City Mall, Mumbai', 'Unit No. LG, 48 Lower, PHOENIX MARKETCITY, Lal Bahadur Shastri Marg, Patelwadi.Kurla, Kurla West, Kurla, Mumbai, Maharashtra 400070', '-', '11 AM-9 PM', 'https://maps.app.goo.gl/auB1ujTvQX8BNmcR9', 'https://www.zudio.com/', '4.2');
