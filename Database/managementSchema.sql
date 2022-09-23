--  IT Team table
create table it_team
(
  id int auto_increment,
  admin_name varchar(100),
  admin_passcode varchar(100),

  primary key(id)
)
ENGINE = InnoDB;


--  Department Table
create table department
(	
  id int auto_increment,
  dep_name varchar(100),
  it_team_id int not null,
  
  primary key(id),
  foreign key(it_team_id) references it_team(id)
)
ENGINE = InnoDB;


-- Attendance Table 
create table attendance
(
id int not null auto_increment,
stud_attendance decimal(5,2) default (100.00),
department_id int not null,

primary key(id),
foreign key(department_id) references department(id)
)
ENGINE = InnoDB;


-- Student Table
create table student
(
id int not null auto_increment,
name varchar(100),
standard varchar(100),
email varchar(100),
phone bigint ,
passcode varchar(100),
address varchar(100),
stud_attendance decimal(5,2),
stud_sub varchar(255) not null
attendance_id int not null,

primary key(id),
foreign key(attendance_id) references attendance(id)
)
ENGINE = InnoDB;

--  Staff Table 
create table staff
(
  id int not null auto_increment,
  staff_name varchar(100),
  staff_role varchar(100),
  staff_sub_rol varchar(100),
  staff_phone tinyint,
  attendance_id int not null,
  staff_attendance decimal(5,2) not null,

  primary key(id),
  foreign key(attendance_id) references attendance(id)
)
ENGINE = InnoDB;
