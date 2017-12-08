-- DATABASE CREATION
 CREATE
	DATABASE healthcare;

-- USERS TABLE CREATION 
 CREATE
	TABLE
		USER(
			user_id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
			mail_id VARCHAR(50) NOT NULL,
			PASSWORD VARCHAR(25) NOT NULL,
			status BOOLEAN,
			created_date DATETIME NOT NULL
		);



-- USER_DETAILS  TABLE CREATION
 DROP
	TABLE
		IF EXISTS USER_DETAILS;

CREATE
	TABLE
		user_details(
			user_details_id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
			user_id INT(10) NOT NULL,
			first_name VARCHAR(25) NOT NULL,
			last_name VARCHAR(25),
			location VARCHAR(100) NOT NULL,
			phone_number VARCHAR(15) NOT NULL,
			office_number VARCHAR(15),
			created_date DATETIME NOT NULL,
			updated_date DATETIME,
			CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES USER(user_id)
		);

ALTER TABLE user_role_type DROP FOREIGN KEY fk_user_role_type;

SELECT now() FROM DUAL;


-- 
-- ALTER TABLE user_role_type
--   ADD CONSTRAINT fk_user_role_type
--   FOREIGN KEY (role_id)
--   REFERENCES user_role (role_id) ON DELETE CASCADE;

-- truncate  TABLE user;
-- 
DELETE FROM user_role WHERE user_id=1;




-- USER_ROLE TABLE CREATION
 CREATE
	TABLE
		user_role(
			user_id INT(10) NOT NULL,
			role_id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
			CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES USER(user_id) ON DELETE CASCADE
		);
-- USER_ROLE_TYPE TABLE CREATION

CREATE
	TABLE
		user_role_type(
			role_type_id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
			role_id INT(10) NOT NULL,
			role_type_name varchar(10),
			CONSTRAINT fk_user_role FOREIGN KEY(role_id) REFERENCES USER(role_id) ON DELETE CASCADE
		);










